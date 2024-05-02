export const runQuery = (db, sql, param) => {
  return new Promise((resolve, reject) => {
    db.run(sql, param, function (error) {
      if (error) {
        reject(error);
      } else resolve(this);
    });
  });
};

export const getData = (db, sql, param) => {
  return new Promise((resolve, reject) => {
    db.get(sql, param, (error, row) => {
      if (error) {
        reject(error);
      } else resolve(row);
    });
  });
};
