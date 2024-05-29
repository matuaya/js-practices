#!/usr/bin/env node

import fs from "fs";
import fsPromise from "node:fs/promises";
import { readUserInput, selectPrompt } from "./memo_prompt.js";

export class MemoRepository {
  constructor() {
    this.path = "./memos.json";
  }

  async getAllData() {
    if (!fs.existsSync(this.path)) {
      return [];
    }
    const allData = await fsPromise.readFile(this.path, "utf-8");
    return JSON.parse(allData);
  }

  async add() {
    const memos = await this.getAllData();
    const inputData = await readUserInput();

    const id =
      memos.length > 0 ? Math.max(...memos.map((memo) => memo.id)) + 1 : 1;
    const newMemoData = { id: id, content: inputData };
    memos.push(newMemoData);

    fs.writeFile(this.path, JSON.stringify(memos, null, 2));
  }

  async showList() {
    const memos = await this.getAllData();
    memos.forEach((memo) => console.log(memo.content[0]));
  }

  async showFullContent() {
    try {
      const memos = await this.getAllData();
      const prompt = await selectPrompt("Choose a memo you want to see");
      const selectedId = await prompt.run();
      const memo = memos.find((memo) => memo.id === selectedId);
      memo.content.forEach((line) => console.log(line));
    } catch (error) {
      console.error(error);
    }
  }

  async delete() {
    try {
      let memos = await this.getAllData();
      const prompt = await selectPrompt("choose a memo you want to delete");
      const selectedId = await prompt.run();
      memos = memos.filter((memo) => memo.id !== selectedId);

      fs.writeFile(this.path, JSON.stringify(memos, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
}

const memoRepo = new MemoRepository();

const option = process.argv[2];
if (option === "-l") {
  memoRepo.showList();
} else if (option === "-r") {
  memoRepo.showFullContent();
} else if (option === "-d") {
  memoRepo.delete();
} else {
  memoRepo.add();
}