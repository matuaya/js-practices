#!/usr/bin/env node

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

await runQuery(db, "DROP TABLE books");

await runQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
);

try {
  await runQuery(db, "INSERT INTO books (name) VALUES (?)", ["book1"]);
} catch (error) {
  if (error && error.code === "SQLITE_ERROR") {
    console.error(error.message);
  } else {
    throw error;
  }
}

try {
  await getData(db, "SELECT * FROM textbooks WHERE title = ?", ["book1"]);
} catch (error) {
  if (error && error.code === "SQLITE_ERROR") {
    console.error(error.message);
  } else {
    throw error;
  }
}

runQuery(db, "DROP TABLE books");
