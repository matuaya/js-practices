import { readUserInput, selectPrompt } from "./memo_prompt.js";

export default class MemoService {
  constructor(repository) {
    this.repository = repository;
  }

  async add() {
    const inputData = await readUserInput();
    this.repository.add(inputData);
  }

  async delete() {
    if (!(await this.repository.dataExists())) {
      console.log("No memos found");

      return;
    }
    const memos = await this.repository.getMemos();
    const prompt = await selectPrompt(
      "choose a memo you want to delete",
      memos,
    );
    try {
      const selectedId = await prompt.run();
      await this.repository.delete(selectedId);
      console.log("Memo deleted successfully");
    } catch (error) {
      if (error === "") {
        console.log("No memo selected");
      } else {
        throw error;
      }
    }
  }

  async showList() {
    if (!(await this.repository.dataExists())) {
      console.log("No memos found");

      return;
    }
    const memos = await this.repository.getMemos();
    memos.forEach((memo) => {
      console.log(memo.firstLine());
    });
  }

  async showFullContent() {
    if (!(await this.repository.dataExists())) {
      console.log("No memos found");

      return;
    }
    const memos = await this.repository.getMemos();
    const prompt = await selectPrompt("Choose a memo you want to see", memos);
    try {
      const selectedId = await prompt.run();
      const memo = await this.repository.getMemo(selectedId);
      console.log(memo.content);
    } catch (error) {
      if (error === "") {
        console.log("No memo selected");
      } else {
        throw error;
      }
    }
  }
}
