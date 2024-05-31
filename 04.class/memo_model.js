import { MemoRepository } from "./memo_repository.js";
import { readUserInput } from "./memo_prompt.js";

export class Memo {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }

  static async createData(newId) {
    const inputData = await readUserInput();

    return { id: newId, content: inputData };
  }

  static async createMemos() {
    const allData = await new MemoRepository().getAllData();
    const memos = allData.map((data) => {
      return new Memo(data.id, data.content);
    });

    return memos;
  }

  firstLine() {
    const lines = this.fullContent();

    return lines[0];
  }

  fullContent() {
    return this.content.split("\n");
  }
}
