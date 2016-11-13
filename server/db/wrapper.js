global.db = global.db;

const dbw = {
  insert: (table, data) => {
    return new Promise((resolve, reject) => {
      db.table(table).insert(data).run()
      .then((r) => {
        resolve(r);
      })
      .catch((err) => {
        reject(err);
      })
    });
  },

  insertMany: (table, data) => {
    return new Promise((resolve, reject) => {
      db.table(table).insertMany(data, (err, r) => {
        if (err) { reject(err); return; }
        resolve(r);
      });
    });
  },

  update: (table, data) => {
    return new Promise((resolve, reject) => {
      db.table(table).updateOne(data, (err, r) => {
        if (err) { reject(err); return; }
        resolve(r);
      });
    });
  },

  updateMany: (table, data) => {
    return new Promise((resolve, reject) => {
      db.table(table).updateMany(data, (err, r) => {
        if (err) { reject(err); return; }
        resolve(r);
      });
    });
  },

  remove: (table, data) => {
    return new Promise((resolve, reject) => {
      db.table(table).deleteOne(data, (err, r) => {
        if (err) { reject(err); return; }
        resolve(r);
      });
    });
  },

  removeMany: (table, data) => {
    return new Promise((resolve, reject) => {
      db.table(table).deleteMany(data, (err, r) => {
        if (err) { reject(err); return; }
        resolve(r);
      });
    });
  },

  find: (table, data) => {
    return new Promise((resolve, reject) => {
      db.table(table).filter(data).run()
      .then((r) => {
        resolve(r);
      })
      .catch((err) => {
        reject(err);
      })
    });
  },

  findPrimary: (table, value) => {
    return new Promise((resolve, reject) => {
      db.table(table).get(value).run()
      .then((r) => {
        resolve(r);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
};

module.exports = {
  dbw,
};
