const s3 = require('./s3');
const table = require('../../config.js').db.gifs;
const dbw = require('../db/wrapper').dbw;

const tableName = table.name;
const tableIndex = table.secondaryIndexField;

var fs = require('fs');
let tags = [];
fs.readFile('newtags.txt', 'utf8', function (err,list) {
  tags = JSON.parse(list);
});

function getTags(tags, name) {
  return tags.filter((a) => {
    return a.name == name;
  }).shift();
}


function syncfiles() {
  return new Promise((resolve, reject) => {
    let list = [];
    s3.getAllFiles(list).then(() => {
      let files = list;
      let i = 0;
      for (let file of files) {
        let filedb = {
          name: file.Key.replace('img/','').replace('.gif', ''),
          size: file.Size,
          ETag: file.ETag,
          LastModified: file.LastModified.toString(),
        }

        let tagsData = getTags(tags, filedb.name);
        filedb.tags = tagsData.tags;
        filedb.customTags = tagsData.custom_tags || [];

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