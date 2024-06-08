export default class MemoService {
  constructor(repository) {
    this.repo = repository;
  }

  async add(inputData) {
    this.repo.add(inputData);
  }

  async delete(selectedId) {
    this.repo.delete(selectedId);

    console.log("Memo deleted successfully");
  }

  async showList() {
    const memos = await this.repo.createMemos();
    memos.forEach((memo) => {
      console.log(memo.firstLine());
    });
  }

  async showFullContent(selectedId) {
    const memo = await this.repo.getMemo(selectedId);
    memo.contentLines().forEach((line) => console.log(line));
  }
}
