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

  async createMemos() {
    const allData = await this.getAllData();
    const memos = allData.map((data) => new Memo(data.id, data.content));

    return memos;
  }

  async showList() {
    if (await this.#dataExists()) {
      const memos = await this.createMemos();
      memos.forEach((memo) => console.log(memo.firstLine()));
    }
  }

  async showFullContent(selectedId) {
    if (await this.#dataExists()) {
      const memos = await this.createMemos();
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
