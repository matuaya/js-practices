import { Memo } from "./memo_model.js";
import { selectPrompt } from "./memo_prompt.js";

export class MemoRepository {
  constructor(storage) {
    this.storage = storage;
  }

  getAllData() {
    return this.storage.getAllData();
  }

  add() {
    this.storage.add();
  }

  delete() {
    this.storage.delete();
  }

  async showList() {
    if (await this.#dataExists()) {
      const memos = await Memo.createMemos();
      memos.forEach((memo) => console.log(memo.firstLine()));
    }
  }

  async showFullContent() {
    if (await this.#dataExists()) {
      const memos = await Memo.createMemos();
      const prompt = await selectPrompt("Choose a memo you want to see");
      const selectedId = await prompt.run();
      const memo = memos.find((memo) => memo.id === selectedId);
      memo.fullContent().forEach((line) => console.log(line));
    }
  }

  async #dataExists() {
    if (!(await this.storage.dataExists())) {
      console.log("No memos found");

      return false;
    }

    return true;
  }
}
