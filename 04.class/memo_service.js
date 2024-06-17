export default class MemoService {
  constructor(repository) {
    this.repository = repository;
  }

  async add(inputData) {
    return await this.repository.add(inputData);
  }

  async delete(id) {
    return await this.repository.delete(id);
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
