#!/usr/bin/env node

import JsonFileStorage from "./file_storage.js";
import MemoRepository from "./memo_repository.js";
import MemoService from "./memo_service.js";
import { readUserInput, selectPrompt } from "./memo_prompt.js";

const option = process.argv[2];
const storage = new JsonFileStorage("./memos.json");
const repository = new MemoRepository(storage);
const service = new MemoService(repository);

if (option === "-l") {
  if (await repository.dataExists()) {
    service.showList();
  }
} else if (option === "-r") {
  if (await repository.dataExists()) {
    const memos = await repository.getMemos();
    const prompt = await selectPrompt("Choose a memo you want to see", memos);
    try {
      const selectedId = await prompt.run();
      service.showFullContent(selectedId);
    } catch (error) {
      if (error === "") {
        console.log("No memo selected");
      } else {
        throw error;
      }
    }
  }
} else if (option === "-d") {
  if (await repository.dataExists()) {
    const memos = await repository.getMemos();
    const prompt = await selectPrompt(
      "choose a memo you want to delete",
      memos,
    );
    try {
      const selectedId = await prompt.run();
      service.delete(selectedId);
    } catch (error) {
      if (error === "") {
        console.log("No memo selected");
      } else {
        throw error;
      }
    }
  }
} else {
  const inputData = await readUserInput();
  service.add(inputData);
}
