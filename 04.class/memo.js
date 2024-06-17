#!/usr/bin/env node

import MemoJsonStorage from "./memo_json_storage.js";
import MemoRepository from "./memo_repository.js";
import MemoService from "./memo_service.js";
import { readUserInput, selectPrompt } from "./memo_prompt.js";

const option = process.argv[2];
const storage = new MemoJsonStorage("./memos.json");
const repository = new MemoRepository(storage);
const service = new MemoService(repository);

const showMemoList = async () => {
  if (!(await repository.dataExists())) {
    console.log("No memos found");

    return;
  }
  await service.showList();
};

const showMemoContent = async () => {
  if (!(await repository.dataExists())) {
    console.log("No memos found");

    return;
  }
  const memos = await repository.getMemos();
  const prompt = await selectPrompt("Choose a memo you want to see", memos);
  try {
    const selectedId = await prompt.run();
    await service.showFullContent(selectedId);
  } catch (error) {
    if (error === "") {
      console.log("No memo selected");
    } else {
      throw error;
    }
  }
};

const deleteMemo = async () => {
  if (!(await repository.dataExists())) {
    console.log("No memos found");

    return;
  }
  const memos = await repository.getMemos();
  const prompt = await selectPrompt("choose a memo you want to delete", memos);
  try {
    const selectedId = await prompt.run();
    await service.delete(selectedId);
    console.log("Memo deleted successfully");
  } catch (error) {
    if (error === "") {
      console.log("No memo selected");
    } else {
      throw error;
    }
  }
};

const addMemo = async () => {
  const inputData = await readUserInput();
  await service.add(inputData);
};

if (option === "-l") {
  showMemoList();
} else if (option === "-r") {
  showMemoContent();
} else if (option === "-d") {
  deleteMemo();
} else {
  addMemo();
}
