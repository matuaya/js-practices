#!/usr/bin/env node

import MemoJsonStorage from "./memo_json_storage.js";
import MemoRepository from "./memo_repository.js";
import MemoService from "./memo_service.js";

const option = process.argv[2];
const storage = new MemoJsonStorage("./memos.json");
const repository = new MemoRepository(storage);
const service = new MemoService(repository);

if (option === "-l") {
  service.showList();
} else if (option === "-r") {
  service.showFullContent();
} else if (option === "-d") {
  service.delete();
} else {
  service.add();
}
