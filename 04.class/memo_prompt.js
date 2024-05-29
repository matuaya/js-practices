import enquirer from "enquirer";
import { Memo } from "./memo.js";

export const readUserInput = () => {
  return new Promise((resolve, reject) => {
    process.stdin.setEncoding("utf-8");

    let inputData = "";
    process.stdin
      .on("data", (chunk) => (inputData += chunk))
      .on("end", () => {
        if (inputData == "") {
          reject(new Error("No input provided"));
        } else {
          resolve(inputData);
        }
      })
      .on("error", (error) => reject(error));
  });
};

export const selectPrompt = async (instruction) => {
  const memos = await Memo.createMemos();
  const memoChoices = memos.map((memo) => {
    return { name: memo.id, message: memo.firstLine() };
  });

  return new enquirer.Select({
    name: "memo",
    message: instruction,
    choices: memoChoices,
  });
};
