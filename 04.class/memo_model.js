export default class Memo {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }

  firstLine() {
    const lines = this.#contentLines();

    return lines[0];
  }

  #contentLines() {
    return this.content.split("\n");
  }
}
