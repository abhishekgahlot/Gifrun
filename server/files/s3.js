const AWS = require('aws-sdk');
const s3config = require('../../config.js').s3;

AWS.config.update(s3config);

const s3server = new AWS.S3({apiVersion: '2006-03-01'});

const s3 = {
  getFiles: function() {
    return new Promise((resolve, reject) => {
      s3server.listObjects(s3config.params, function(err, data) {
        if (err) { reject(err); return;}
        resolve(data);
      });
    });
  }
}

module.exports = s3;
