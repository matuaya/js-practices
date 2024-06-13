export default class MemoService {
  constructor(repository) {
    this.repository = repository;
  }

  async add(inputData) {
    this.repository.add(inputData);
  }

  async delete(selectedId) {
    this.repository.delete(selectedId);

    console.log("Memo deleted successfully");
  }

  async showList() {
    const memos = await this.repository.getMemos();
    memos.forEach((memo) => {
      console.log(memo.firstLine());
    });
  }

  async showFullContent(selectedId) {
    const memo = await this.repository.getMemo(selectedId);
    memo.contentLines().forEach((line) => {
      console.log(line);
    });
  }
}
