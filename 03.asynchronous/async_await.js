#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory:");

const runQuery = (sql, param) => {
  return new Promise((resolve) => {
    db.run(sql, param, function () {
      resolve(this);
    });
  });
};

const getData = (sql, param) => {
  return new Promise((resolve) => {
    db.get(sql, param, (_, row) => {
      resolve(row);
    });
  });
};

(async () => {
  await runQuery(
    "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  );
  const statementObj = await runQuery("INSERT INTO books (title) VALUES (?)", [
    "book1",
  ]);
  console.log(statementObj.lastID);

  const row = await getData("SELECT * FROM books WHERE title=?", ["book1"]);
  console.log(row);

  runQuery("DROP TABLE books");
})();

await timers.setTimeout(1000);

const runQueryErrorHandling = (sql, param) => {
  return new Promise((resolve, reject) => {
    db.run(sql, param, function (error) {
      if (error) {
        reject(error);
      } else resolve(this);
    });
  });
};

const getDataErrorHandling = (sql, param) => {
  return new Promise((resolve, reject) => {
    db.get(sql, param, (error, row) => {
      if (error) {
        reject(error);
      } else resolve(row);
    });
  });
};

(async () => {
  await runQuery(
    "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  );

  try {
    const statementObj = await runQueryErrorHandling(
      "INSERT INTO books (name) VALUES (?)",
      ["book1"],
    );
    console.log(statementObj.lastID);
  } catch (error) {
    console.log(error.message);
  }

  try {
    const row = await getDataErrorHandling(
      "SELECT * FROM textbooks WHERE title=?",
      ["book1"],
    );
    console.log(row);
  } catch (error) {
    console.log(error.message);
  }

  runQuery("DROP TABLE books");
})();
