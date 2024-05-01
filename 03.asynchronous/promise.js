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

runQuery(
  "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runQuery("INSERT INTO books (title) VALUES (?)", ["book1"]);
  })
  .then((statementObj) => {
    console.log(statementObj.lastID);
  })
  .then(() => {
    return getData("SELECT * FROM books WHERE title=?", ["book1"]);
  })
  .then((row) => {
    console.log(row);
  })
  .then(() => {
    return runQuery("DROP TABLE books");
  });

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

runQuery(
  "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runQueryErrorHandling("INSERT INTO books (name) VALUES (?)", [
      "book1",
    ]);
  })
  .then((statementObj) => {
    console.log(statementObj.lastID);
  })
  .catch((error) => {
    console.log(error.message);
  })

  .then(() => {
    return getDataErrorHandling("SELECT * FROM textbooks WHERE title=?", [
      "book1",
    ]);
  })
  .then((row) => {
    console.log(row);
  })
  .then(() => {
    return runQuery("DROP TABLE books");
  })
  .catch((error) => {
    console.log(error.message);
  });
