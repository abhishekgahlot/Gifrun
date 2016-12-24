const config = require('../../config.js').cloudvision;
const vision = require('@google-cloud/vision')({
  projectId: config.project_id,
  credentials: config
});
// process.env['GCLOUD_PROJECT'] = config.project_id;
// process.env['GOOGLE_ACCOUNT_TYPE'] = config.type;
// process.env['GOOGLE_CLIENT_ID'] = config.client_id;
// process.env['GOOGLE_CLIENT_EMAIL'] = config.client_email;
// process.env['GOOGLE_PRIVATE_KEY'] = config.private_key;

function detectLabels (inputFile) {
  return new Promise((resolve, reject) => {
    // Make a call to the Vision API to detect the labels
    vision.detectLabels(inputFile, { verbose: true }, function (err, labels) {
      if (err) {
        return reject(err);
      }
      resolve(labels);
    });
  });
}

module.exports = detectLabels;
