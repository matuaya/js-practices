import readline from "readline";
import enquirer from "enquirer";
import { Memo } from "./memo.js";

export const promptUserInput = () => {
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
};

export const selectPrompt = async (instruction) => {
  const memos = await Memo.getAllMemos();
  const memoChoices = memos.map((memo) => {
    return { name: memo.id, message: memo.content[0] };
  });

  return new enquirer.Select({
    name: "memo",
    message: instruction,
    choices: memoChoices,
  });
};
