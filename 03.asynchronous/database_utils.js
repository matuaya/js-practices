export const runQuery = (db, sql, params) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (error) {
      if (error) {
        reject(error);
      } else resolve(this);
    });
  });
};

export const getData = (db, sql, params) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) {
        reject(error);
      } else resolve(row);
    });
  });
};
