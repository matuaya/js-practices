export default class MemoService {
  constructor(repository) {
    this.repository = repository;
  }

  add(inputData) {
    return this.repository.add(inputData);
  }

  delete(id) {
    return this.repository.delete(id);
  }

  async showList() {
    const memos = await this.repository.getMemos();
    memos.forEach((memo) => {
      console.log(memo.firstLine());
    });
  }

  async showFullContent(id) {
    const memo = await this.repository.getMemo(id);
    console.log(memo.content);
  }
}
