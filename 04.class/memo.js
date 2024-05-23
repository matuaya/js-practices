import fs from "node:fs/promises";
import readline from "readline";

class Memo {
  static async getAllMemos() {
    const memos = await fs.readFile("memos.json", "utf-8");

    return memos ? JSON.parse(memos) : [];
  }

  static async add() {
    const memos = await this.getAllMemos();
    const inputData = await this.#promptUserInput();

    const id =
      memos.length > 0 ? Math.max(...memos.map((memo) => memo.id)) + 1 : 1;
    const newMemoData = { id: id, content: inputData };
    memos.push(newMemoData);

    fs.writeFile("memos.json", JSON.stringify(memos, null, 2));
  }

  static async showList() {
    const memos = await this.getAllMemos();
    memos.forEach((memo) => console.log(memo.content[0]));
  }
  static async showFullContent() {}
  static async delete() {}

  static async #promptUserInput() {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const lines = [];
      rl.on("line", (input) => {
        lines.push(input);
      }).on("close", async () => {
        if (lines.length === 0) {
          reject(new Error("No input provided"));
        } else {
          resolve(lines);
        }
      });
    });
  }
}

const option = process.argv[2];
if (option === "-l") {
  Memo.showList();
} else if (option === "-r") {
  Memo.showFullContent();
} else if (option === "-d") {
  Memo.delete();
} else {
  Memo.add();
}
