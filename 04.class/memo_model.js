export class Memo {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }

  firstLine() {
    const lines = this.fullContent();

    return lines[0];
  }

  fullContent() {
    return this.content.split("\n");
  }
}
