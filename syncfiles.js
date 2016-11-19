const database = require('./server/db/interface');
const dbw = require('./server/db/wrapper').dbw;
const syncfiles = require('./server/files/syncfiles');

database.prepareDB(database.db).then(() => {
  global.db = database.db;
  syncfiles().then(() => {
    console.log('Syncing done.');
    process.exit(0);
  })
});