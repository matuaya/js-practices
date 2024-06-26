export default class Memo {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }

  firstLine() {
    const lines = this.content.split("\n");

    return lines[0];
  }
}
