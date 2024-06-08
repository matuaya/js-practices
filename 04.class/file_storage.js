import fs from "node:fs/promises";

export default class JsonFileStorage {
  constructor() {
    this.file = "./memos.json";
  }

  async getAllData() {
    if (!(await this.#fileExists())) {
      return [];
    }
    const allData = await fs.readFile(this.file, "utf-8");

    return JSON.parse(allData);
  }

  async add(inputData) {
    const allData = await this.getAllData();
    const newId = crypto.randomUUID();
    allData.push({ id: newId, content: inputData });

    await fs.writeFile(this.file, JSON.stringify(allData, null, 2));
  }

  async delete(selectedId) {
    let allData = await this.getAllData();
    allData = allData.filter((data) => data.id !== selectedId);

    await fs.writeFile(this.file, JSON.stringify(allData, null, 2));
  }

  async dataExists() {
    if (!(await this.#fileExists())) {
      return false;
    }
    if (await this.#fileHasContent()) {
      return false;
    }

    return true;
  }

  async #fileExists() {
    try {
      await fs.access(this.file);
      return true;
    } catch (error) {
      if (error.code === "ENOENT") {
        return false;
      } else {
        throw error;
      }
    }
  }

  async #fileHasContent() {
    const fileContent = await fs.readFile(this.file);
    const parsedContent = JSON.parse(fileContent);

    return parsedContent.length === 0;
  }
}
