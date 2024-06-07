import fs from "node:fs/promises";
import { Memo } from "./memo_model.js";
import { selectPrompt } from "./memo_prompt.js";

export default class JsonFileStorage {
  constructor() {
    this.file = "./memos.json";
  }

  async getAllData() {
    if (!(await this.#fileExists())) {
      return [];
    }
    const allData = await fs.readFile(this.file, "utf-8");

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

    await fs.writeFile(this.file, JSON.stringify(allData, null, 2));
    console.log("Memo added successfully");
  }

  async delete() {
    if (await this.checkFileAndContent()) {
      let memos = await Memo.createMemos();
      const prompt = await selectPrompt("choose a memo you want to delete");
      const selectedId = await prompt.run();
      memos = memos.filter((memo) => memo.id !== selectedId);

      await fs.writeFile(this.file, JSON.stringify(memos, null, 2));
      console.log("Memo deleted successfully");
    }
  }

  async #fileExists() {
    try {
      await fs.access(this.file);
      return true;
    } catch (error) {
      if (error.code === "ENOENT") {
        return false;
      } else {
        throw error;
      }
    }
  }

  async #isFileEmpty() {
    const fileContent = await fs.readFile(this.file);
    const parsedContent = JSON.parse(fileContent);

    return parsedContent.length === 0;
  }

  async checkFileAndContent() {
    if (!(await this.#fileExists())) {
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
