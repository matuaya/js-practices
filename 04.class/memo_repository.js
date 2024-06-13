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
    const allData = await this.#getAllData();
    const memos = allData.map((data) => new Memo(data.id, data.content));

    return memos;
  }

  async getMemo(id) {
    const memos = await this.getMemos();
    return memos.find((memo) => memo.id === id);
  }

  async dataExists() {
    return this.storage.dataExists();
  }

  #getAllData() {
    return this.storage.getAllData();
  }
}
