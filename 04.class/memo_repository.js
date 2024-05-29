#!/usr/bin/env node

import fs from "node:fs/promises";
import { readUserInput, selectPrompt } from "./memo_prompt.js";

export class MemoRepository {
  static async getAllMemos() {
    const memos = await fs.readFile("memos.json", "utf-8");

    return memos ? JSON.parse(memos) : [];
  }

  static async add() {
    const memos = await this.getAllMemos();
    const inputData = await readUserInput();

    const id =
      memos.length > 0 ? Math.max(...memos.map((memo) => memo.id)) + 1 : 1;
    const newMemoData = { id: id, content: inputData };
    memos.push(newMemoData);

    fs.writeFile("memos.json", JSON.stringify(memos, null, 2));
  }

  static async showList() {
    const memos = await this.getAllMemos();
    memos.forEach((memo) => console.log(memo.content[0]));
  }

  static async showFullContent() {
    try {
      const memos = await this.getAllMemos();
      const prompt = await selectPrompt("Choose a memo you want to see");
      const selectedId = await prompt.run();
      const memo = memos.find((memo) => memo.id === selectedId);
      memo.content.forEach((line) => console.log(line));
    } catch (error) {
      console.error(error);
    }
  }

  static async delete() {
    try {
      let memos = await this.getAllMemos();
      const prompt = await selectPrompt("choose a memo you want to delete");
      const selectedId = await prompt.run();
      memos = memos.filter((memo) => memo.id !== selectedId);

      fs.writeFile("memos.json", JSON.stringify(memos, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
}

const option = process.argv[2];
if (option === "-l") {
  MemoRepository.showList();
} else if (option === "-r") {
  MemoRepository.showFullContent();
} else if (option === "-d") {
  MemoRepository.delete();
} else {
  MemoRepository.add();
}
