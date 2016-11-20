const s3 = require('./s3');
const table = require('../../config.js').db.gifs;
const dbw = require('../db/wrapper').dbw;

const tableName = table.name;
const tableIndex = table.secondaryIndexField;

function syncfiles() {
  return new Promise((resolve, reject) => {
    s3.getFiles().then((data) => {
      let files = data;
      let i = 0;
      for (let file of files) {
        let filedb = {
          name: file.Key.replace('img/','').replace('.gif', ''),
          size: file.Size,
          ETag: file.ETag,
          LastModified: file.LastModified.toString()
        }
        dbw.find(tableName, { [tableIndex]: filedb.name })
        .then((data) => {
          if (!data.length) {
            return dbw.insert(tableName, filedb);
          } else {
            return Promise.resolve([]);
          }
        })
        .then((data) => {
          i += 1;
          if (i === files.length) {
            return resolve(true);
          }
        })
      }
    });
  });
}

module.exports = syncfiles;