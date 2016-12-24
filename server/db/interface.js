const log = require('../../utils').log;
const config = require('../../config');
const assert = require('assert');

const db = require('rethinkdbdash')({
    discovery: true,
    db: config.db.name
})();


/*
  Create db if not present.
*/
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


/*
  Create table if not present in db with primarykey as optional.
*/
function createTable(r, dbName, tableName, primaryKey) {
  return new Promise((resolve, reject) => {
    r.tableList().run().then((list) => {
      if (list.indexOf(tableName) > -1) {
        log(`Table ${tableName} found, Skipping.`);
        resolve(true);
      } else {
        log(`Table ${tableName} not found. Creating one.`);
        if (primaryKey) {
          r.db(dbName).tableCreate(tableName, {primaryKey}).run().then(() => {
            resolve(true);
          });
        } else {
          r.db(dbName).tableCreate(tableName).run().then(() => {
            resolve(true);
          });
        }
      }
    });
  });
}


/*
  Create secondary index on table provided.
*/
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


/*
  Prepare database.
  Create one.
  Create tables.
  Create indexes if given in config.
*/
function prepareDB(db) {
  log('Ensuring database is fine.');
  return new Promise((resolve) => {
    createDB(db, config.db.name)
    .then(() => {
      return createTable(db, config.db.name, config.db.users.name, config.db.users.indexField);
    })
    .then(() => {
      return createTable(db, config.db.name, config.db.gifs.name);
    })
    .then(() => {
      return createIndex(db, config.db.gifs.name, config.db.gifs.secondaryIndexField);
    })
    .then(() => {
      resolve(true);
    });
  });
}


module.exports = {
  prepareDB,
  db
};
