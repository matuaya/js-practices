import fs from "fs";
import fsPromise from "node:fs/promises";
import { Memo } from "./memo_model.js";
import { selectPrompt } from "./memo_prompt.js";

export class MemoRepository {
  constructor() {
    this.path = "./memos.json";
  }

  async getAllData() {
    if (!this.#fileExists()) {
      return [];
    }
    const allData = await fsPromise.readFile(this.path, "utf-8");

    return JSON.parse(allData);
  }

  async createNewId() {
    const allData = await this.getAllData();

    return allData.length > 0
      ? Math.max(...allData.map((memo) => memo.id)) + 1
      : 1;
  }

  async add() {
    const allData = await this.getAllData();
    const newId = await this.createNewId();
    const newData = await Memo.createData(newId);
    allData.push(newData);

    await fsPromise.writeFile(this.path, JSON.stringify(allData, null, 2));
    console.log("Memo added successfully");
  }

  async delete() {
    if (await this.#checkFileAndContent()) {
      let memos = await Memo.createMemos();
      const prompt = await selectPrompt("choose a memo you want to delete");
      const selectedId = await prompt.run();
      memos = memos.filter((memo) => memo.id !== selectedId);

      await fsPromise.writeFile(this.path, JSON.stringify(memos, null, 2));
      console.log("Memo deleted successfully");
    }
  }

  async showList() {
    if (await this.#checkFileAndContent()) {
      const memos = await Memo.createMemos();
      memos.forEach((memo) => console.log(memo.firstLine()));
    }
  }

  async showFullContent() {
    if (await this.#checkFileAndContent()) {
      const memos = await Memo.createMemos();
      const prompt = await selectPrompt("Choose a memo you want to see");
      const selectedId = await prompt.run();
      const memo = memos.find((memo) => memo.id === selectedId);
      memo.fullContent().forEach((line) => console.log(line));
    }
  }

  #fileExists() {
    return fs.existsSync(this.path);
  }

  async #isFileEmpty() {
    const fileContent = await fsPromise.readFile(this.path);
    const parsedContent = JSON.parse(fileContent);

    return parsedContent.length === 0;
  }

  async #checkFileAndContent() {
    if (!this.#fileExists()) {
      console.log("File does not exist");
      return false;
    } else if (await this.#isFileEmpty()) {
      console.log("No memos found");
      return false;
    } else {
      return true;
    }
  }
}
