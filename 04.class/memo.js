import fs from "node:fs/promises";
import readline from "readline";
import enquirer from "enquirer";

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

  static async showFullContent() {
    try {
      const memos = await this.getAllMemos();
      const prompt = await this.#selectPrompt("Choose a memo you want to see");
      const selectedId = await prompt.run();
      const memo = memos.find((memo) => memo.id === selectedId);
      memo.content.forEach((line) => console.log(line));
    } catch (error) {
      console.error(error);
    }
  }

  static async delete() {
    try {
      let memos = await this.getAllMemos();
      const prompt = await this.#selectPrompt(
        "choose a memo you want to delete",
      );
      const selectedId = await prompt.run();
      memos = memos.filter((memo) => memo.id !== selectedId);

      fs.writeFile("memos.json", JSON.stringify(memos, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

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

  static async #selectPrompt(instruction) {
    const memos = await Memo.getAllMemos();
    const memoChoices = memos.map((memo) => {
      return { name: memo.id, message: memo.content[0] };
    });

    return new enquirer.Select({
      name: "memo",
      message: instruction,
      choices: memoChoices,
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
