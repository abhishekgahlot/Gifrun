const log = require('../../utils').log;
const config = require('../../config');
const assert = require('assert');

const db = require('rethinkdbdash')({
    discovery: true,
    db: config.db.name
})();

const url = config.db.url;
const index = config.db.index;

function createDB(r, name) {
  return new Promise((resolve, reject) => {
    r.dbList().run().then((list) => {
      if (list.indexOf(name) > -1) {
        log(`Database ${name} already exist. Skipping.`);
        resolve(true);
      } else {
        log(`Database not found. Creating ${name}`);
        r.dbCreate(name).run().then(() => {
          log(`Database ${name} created.`);
          resolve(true);
        });
      }
    });
  });
}

function createTable(r, dbName, tableName) {
  return new Promise((resolve, reject) => {
    r.tableList().run().then((list) => {
      if (list.indexOf(tableName) > -1) {
        log(`Table ${tableName} found, Skipping.`);
        resolve(true);
      } else {
        log(`Table ${tableName} not found. Creating one.`);
        r.db(dbName).tableCreate(tableName, {primaryKey: config.db.indexField}).run().then(() => {
          resolve(true);
        });
      }
    });
  });
}


function createIndex(r, indexTable, indexField) {
  return new Promise((resolve, reject) => {
    r.table(indexTable).indexList().run().then((list) => {
      if(list.indexOf(indexField) > -1) {
        log(`Index ${indexTable}:${indexField} already enabled, Skipping.`);
        resolve(true);
      } else {
        r.table(indexTable).indexCreate(indexField).run().then(() => {
          log(`Index ${indexTable}:${indexField} created.`);
          resolve(true);
        });
      }
    });
  });
}


function ensureIndex(db) {
  log('Ensuring indexes on RethinkDB');
  return new Promise((resolve) => {
    createDB(db, config.db.name)
    .then(() => {
      return createTable(db, config.db.name, config.db.indexTable);
    })
    .then(() => {
      //createIndex(db, config.db.indexTable, config.db.indexField).then(() => {
        resolve(true);
      //});
    });
  });
}

// function connectMongo() {
//   log('Connecting to Mongo server');
//   return new Promise((resolve) => {
//     MongoClient.connect(url, (err, db) => {
//       assert.equal(null, err);
//       global.db = db;
//       ensureIndex(db).then(() => {
//         resolve(db);
//       });
//     });
//   });
// }



module.exports = {
  ensureIndex,
  db
};
