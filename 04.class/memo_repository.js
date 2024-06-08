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

  async #dataExists() {
    if (!(await this.storage.dataExists())) {
      console.log("No memos found");

      return false;
    }

    return true;
  }
}
