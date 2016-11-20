const AWS = require('aws-sdk');
const s3config = require('../../config.js').s3;
const path = require('path');

AWS.config.update(s3config);

const s3server = new AWS.S3({apiVersion: '2006-03-01'});

const s3 = {
  getFiles: function() {
    return new Promise((resolve, reject) => {
      s3server.listObjects(s3config.params, function(err, data) {
        if (err) { reject(err); return;}
        let filteredData = data.Contents.filter((file) => {
          if (path.extname(file.Key) === '.gif') {
            return file;
          }
        })
        resolve(filteredData);
      });
    });
  }
}

module.exports = s3;
