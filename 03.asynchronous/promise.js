#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";
import { runQuery, getData } from "./database_utils.js";

const db = new sqlite3.Database(":memory:");

runQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
)
  .then(() => runQuery(db, "INSERT INTO books (title) VALUES (?)", ["book1"]))
  .then((statement) => {
    console.log(statement.lastID);

    return getData(db, "SELECT * FROM books WHERE title = ?", ["book1"]);
  })
  .then((row) => {
    console.log(row);

    return runQuery(db, "DROP TABLE books");
  });

await timers.setTimeout(1000);

runQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
)
  .then(() => runQuery(db, "INSERT INTO books (name) VALUES (?)", ["book1"]))
  .catch((error) => {
    console.error(error.message);

    return getData(db, "SELECT * FROM textbooks WHERE title = ?", ["book1"]);
  })
  .catch((error) => {
    console.error(error.message);

    return runQuery(db, "DROP TABLE books");
  });
