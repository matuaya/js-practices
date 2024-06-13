export default class MemoService {
  constructor(repository) {
    this.repository = repository;
  }

  async add(inputData) {
    this.repository.add(inputData);
  }

  async delete(id) {
    this.repository.delete(id);
  }

  async showList() {
    const memos = await this.repository.getMemos();
    memos.forEach((memo) => {
      console.log(memo.firstLine());
    });
  }

  async showFullContent(id) {
    const memo = await this.repository.getMemo(id);
    memo.contentLines().forEach((line) => {
      console.log(line);
    });
  }
}
