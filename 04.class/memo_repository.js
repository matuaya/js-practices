import { Memo } from "./memo_model.js";

export class MemoRepository {
  constructor(storage) {
    this.storage = storage;
  }

  getAllData() {
    return this.storage.getAllData();
  }

  add(inputData) {
    this.storage.add(inputData);
  }

  delete(selectedId) {
    this.storage.delete(selectedId);
  }

  async showList() {
    if (await this.#dataExists()) {
      const memos = await Memo.createMemos();
      memos.forEach((memo) => console.log(memo.firstLine()));
    }
  }

  async showFullContent(selectedId) {
    if (await this.#dataExists()) {
      const memos = await Memo.createMemos();
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
