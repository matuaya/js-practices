#!/usr/bin/env node

import { MemoRepository } from "./memo_repository.js";

const memoRepo = new MemoRepository();

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
