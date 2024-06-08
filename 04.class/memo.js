#!/usr/bin/env node

import JsonFileStorage from "./file_storage.js";
import MemoRepository from "./memo_repository.js";
import MemoService from "./memo_service.js";
import { readUserInput, selectPrompt } from "./memo_prompt.js";

const storage = new JsonFileStorage();
const repository = new MemoRepository(storage);
const memoService = new MemoService(repository);

const option = process.argv[2];
if (option === "-l") {
  if (await repository.dataExists()) {
    memoService.showList();
  }
} else if (option === "-r") {
  if (await repository.dataExists()) {
    const memos = await repository.createMemos();
    const prompt = await selectPrompt("Choose a memo you want to see", memos);
    const selectedId = await prompt.run();
    memoService.showFullContent(selectedId);
  }
} else if (option === "-d") {
  if (await repository.dataExists()) {
    const memos = await repository.createMemos();
    const prompt = await selectPrompt(
      "choose a memo you want to delete",
      memos,
    );
    const selectedId = await prompt.run();
    memoService.delete(selectedId);
  }
} else {
  const inputData = await readUserInput();
  memoService.add(inputData);
}
