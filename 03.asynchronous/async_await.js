import sqlite3 from "sqlite3";

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
