#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books (title) VALUES (?)", ["book1"], () => {
      db.run("SELECT * FROM books", function () {
        console.log(this.lastID);

        db.get("SELECT * FROM books WHERE title = ?", ["book1"], (_, row) => {
          console.log(row);

          db.run("DROP TABLE books");
        });
      });
    });
  },
);

await timers.setTimeout(1000);

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books (name) VALUES (?)", ["book1"], function (error) {
      if (error) {
        console.error(error.message);
      } else {
        console.log(this.lastID);
      }
      db.get(
        "SELECT * FROM textbooks WHERE title = ?",
        ["book1"],
        (error, row) => {
          if (error) {
            console.error(error.message);
          } else {
            console.log(row);
          }
          db.run("DROP TABLE books");
        },
      );
    });
  },
);
