#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";
import { runQuery, getData } from "./database_utils.js";

const db = new sqlite3.Database(":memory:");

await runQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
);
const statement = await runQuery(db, "INSERT INTO books (title) VALUES (?)", [
  "book1",
]);
console.log(statement.lastID);

const row = await getData(db, "SELECT * FROM books WHERE title = ?", ["book1"]);
console.log(row);

runQuery(db, "DROP TABLE books");

await timers.setTimeout(1000);

await runQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
);

try {
  await runQuery(db, "INSERT INTO books (name) VALUES (?)", ["book1"]);
} catch (error) {
  console.error(error.message);
}

try {
  await getData(db, "SELECT * FROM textbooks WHERE title = ?", ["book1"]);
} catch (error) {
  console.error(error.message);
}

runQuery(db, "DROP TABLE books");
