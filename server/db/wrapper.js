global.db = global.db;

const dbw = {
  insert: (collection, data) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).insert(data, (err, r) => {
        if (err) { reject(err); return; }
        resolve(r);
      });
    });
  },

  insertMany: (collection, data) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).insertMany(data, (err, r) => {
        if (err) { reject(err); return; }
        resolve(r);
      });
    });
  },

  update: (collection, data) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).updateOne(data, (err, r) => {
        if (err) { reject(err); return; }
        resolve(r);
      });
    });
  },

  updateMany: (collection, data) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).updateMany(data, (err, r) => {
        if (err) { reject(err); return; }
        resolve(r);
      });
    });
  },

  remove: (collection, data) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).deleteOne(data, (err, r) => {
        if (err) { reject(err); return; }
        resolve(r);
      });
    });
  },

  removeMany: (collection, data) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).deleteMany(data, (err, r) => {
        if (err) { reject(err); return; }
        resolve(r);
      });
    });
  },

  find: (collection, data) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).find(data, (err, r) => {
        if (err) { reject(err); return; }
        resolve(r);
      });
    });
  },

  findOne: (collection, data) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).findOne(data, (err, r) => {
        if (err) { reject(err); return; }
        resolve(r);
      })
    })
  }
};

module.exports = {
  dbw,
};
