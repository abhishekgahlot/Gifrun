const AWS = require('aws-sdk');
const s3config = require('../../config.js').s3;
const path = require('path');

AWS.config.update(s3config);

const s3server = new AWS.S3({apiVersion: '2006-03-01'});

const s3 = {

  getFiles: function(continueToken) {
    return new Promise((resolve, reject) => {
      let filteredData = [];
      let newParams = s3config.params;
      if (continueToken) {
        newParams.ContinuationToken = continueToken;
      }
      s3server.listObjectsV2(newParams, function(err, data) {
        if (err) { reject(err); return;}
        let filteredData = data.Contents.filter((file) => {
          if (path.extname(file.Key) === '.gif') {
            return file;
          }
        });
        resolve([filteredData, data.NextContinuationToken]);
      });
    });
  },

  getAllFiles: function(list, continueToken) {
    let deferred = Promise.defer();

    s3.getFiles(continueToken)
    .then((data) => {
      list.push.apply(list, data[0]);
      if(data[1]) { // check next continue token
        s3.getAllFiles(list, data[1]).then(() => {
          deferred.resolve();
        });
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  }
}

module.exports = s3;
