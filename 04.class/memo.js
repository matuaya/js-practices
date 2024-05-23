class Memo {
  static async add() {}
  static async showList() {}
  static async showFullContent() {}
  static async delete() {}
}

const option = process.argv[2];
if (option === "-l") {
  Memo.showList();
} else if (option === "-r") {
  Memo.showFullContent();
} else if (option === "-d") {
  Memo.delete();
} else {
  Memo.add();
}
