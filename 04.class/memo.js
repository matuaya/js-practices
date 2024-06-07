#!/usr/bin/env node

import JsonFileStorage from "./file_storage.js";
import { MemoRepository } from "./memo_repository.js";
import { readUserInput, selectPrompt } from "./memo_prompt.js";

const storage = new JsonFileStorage();
const memoRepo = new MemoRepository(storage);

const option = process.argv[2];
if (option === "-l") {
  memoRepo.showList();
} else if (option === "-r") {
  const prompt = await selectPrompt("Choose a memo you want to see");
  const selectedId = await prompt.run();
  memoRepo.showFullContent(selectedId);
} else if (option === "-d") {
  const prompt = await selectPrompt("choose a memo you want to delete");
  const selectedId = await prompt.run();
  memoRepo.delete(selectedId);
} else {
  const inputData = await readUserInput();
  memoRepo.add(inputData);
}
