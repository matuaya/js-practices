import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books (title) VALUES (?)", ["book1"], () => {
      db.run("SELECT * FROM books", function () {
        console.log(this.lastID);

        db.get("SELECT * FROM books where title=?", ["book1"], (_, row) => {
          console.log(row);

          db.run("DROP TABLE books");
        });
      });
    });
  },
);

await timers.setTimeout(1000);

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books (title) VALUES (?)", ["book1"], () => {
      db.get(
        "SELECT * FROM textbooks WHERE title=?",
        ["book1"],
        (error, row) => {
          if (error) {
            return console.log(error.message);
          }
          console.log(row);

          db.run("DROP TABLE books");
        },
      );
    });
  },
);