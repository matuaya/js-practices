import fs from "node:fs/promises";

export default class JsonFileStorage {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAllData() {
    if (!(await this.#fileExists())) {
      return [];
    }
    const allData = await fs.readFile(this.filePath, "utf-8");

    return JSON.parse(allData);
  }

  async add(inputData) {
    const allData = await this.getAllData();
    const newId = crypto.randomUUID();
    allData.push({ id: newId, content: inputData });

    await fs.writeFile(this.filePath, JSON.stringify(allData, null, 2));
  }

  async delete(id) {
    let allData = await this.getAllData();
    allData = allData.filter((data) => data.id !== id);

    await fs.writeFile(this.filePath, JSON.stringify(allData, null, 2));
  }

  async dataExists() {
    if (!(await this.#fileExists())) {
      return false;
    }
    if (!(await this.#fileHasContent())) {
      return false;
    }

    return true;
  }

  async #fileExists() {
    try {
      await fs.access(this.filePath);
      return true;
    } catch (error) {
      if (error instanceof Error && error.code === "ENOENT") {
        return false;
      } else {
        throw error;
      }
    }
  }

  async #fileHasContent() {
    const fileContent = await fs.readFile(this.filePath);
    const parsedContent = JSON.parse(fileContent);

    return parsedContent.length > 0;
  }
}
