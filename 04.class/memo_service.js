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
    const memos = await this.repo.createMemos();
    const memo = memos.find((memo) => memo.id === selectedId);
    memo.fullContent().forEach((line) => console.log(line));
  }
}
