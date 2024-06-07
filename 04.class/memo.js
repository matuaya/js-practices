#!/usr/bin/env node

import JsonFileStorage from "./file_storage.js";
import { MemoRepository } from "./memo_repository.js";

const storage = new JsonFileStorage();
const memoRepo = new MemoRepository(storage);

const option = process.argv[2];
if (option === "-l") {
  memoRepo.showList();
} else if (option === "-r") {
  memoRepo.showFullContent();
} else if (option === "-d") {
  memoRepo.delete();
} else {
  memoRepo.add();
}
