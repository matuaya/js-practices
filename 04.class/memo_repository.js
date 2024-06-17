import Memo from "./memo_model.js";

export default class MemoRepository {
  constructor(storage) {
    this.storage = storage;
  }

  add(inputData) {
    this.storage.add(inputData);
  }

  delete(id) {
    this.storage.delete(id);
  }

  async getMemos() {
    const allData = await this.storage.getAllData();

    return allData.map((data) => new Memo(data.id, data.content));
  }

  async getMemo(id) {
    const memos = await this.getMemos();
    return memos.find((memo) => memo.id === id);
  }

  dataExists() {
    return this.storage.dataExists();
  }
}
