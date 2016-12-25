const dbw = require('../db/wrapper').dbw;
const config = require('../../config');
const stream = require('../stream/stream');

const search = {

  find: (query) => {
    return new Promise((resolve, reject) => {
      db.table(config.db.gifs.name).filter((doc) => {
        return doc('tags').contains((tag) => {
          return tag('desc').match(query.toString());
        });
      }).limit(30)
      .run()
      .then((result) => {
        resolve(stream.formatData(result));
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
};

module.exports = search;