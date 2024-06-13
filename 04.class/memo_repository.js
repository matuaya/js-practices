import Memo from "./memo_model.js";

export default class MemoRepository {
  constructor(storage) {
    this.storage = storage;
  }

  add(inputData) {
    this.storage.add(inputData);
  }

  delete(selectedId) {
    this.storage.delete(selectedId);
  }

  async getMemos() {
    const allData = await this.#getAllData();
    const memos = allData.map((data) => new Memo(data.id, data.content));

    return memos;
  }

  async getMemo(selectedId) {
    const memos = await this.getMemos();
    return memos.find((memo) => memo.id === selectedId);
  }

  async dataExists() {
    if (!(await this.storage.dataExists())) {
      console.log("No memos found");

      return false;
    }

    return true;
  }

  #getAllData() {
    return this.storage.getAllData();
  }
}
