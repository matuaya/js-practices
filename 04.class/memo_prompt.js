import enquirer from "enquirer";

export const readUserInput = () => {
  return new Promise((resolve, reject) => {
    process.stdin.setEncoding("utf-8");

    let inputData = "";
    process.stdin
      .on("data", (chunk) => (inputData += chunk))
      .on("end", () => {
        if (inputData === "") {
          reject(new Error("No input provided"));
        } else {
          resolve(inputData);
        }
      })
      .on("error", (error) => reject(error));
  });
};

export const selectPrompt = (message, memos) => {
  const choices = memos.map((memo) => ({
    name: memo.id,
    message: memo.firstLine(),
  }));

  return new enquirer.Select({
    name: "memo",
    message,
    choices,
    format() {
      return null;
    },
  });
};
