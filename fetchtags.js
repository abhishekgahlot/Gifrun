const syncdb = require('./server/files/s3');
const cloudVision = require('./server/cloudvision/cloudvision');
var fs = require('fs');

const data = [];
const newData = [];

function getTags(newData, data) {
  let deferred = Promise.defer();
  let fileobj = data.shift();
  cloudVision(fileobj.link)
  .then((tags) => {
    newData.push({
      name: fileobj.name,
      tags: tags
    });
    console.log(newData)
    if (newData.length == 2522) {
      deferred.resolve();
    } else {
      getTags(newData, data).then(()=>{
        deferred.resolve();
      });
    }
  });

  return deferred.promise;
}


fs.readFile('files.txt', 'utf8', function (err,list) {
  let url = 'https://s3.eu-central-1.amazonaws.com/gifrun/'
  JSON.parse(list).forEach((file)=>{
    let name = file.Key.slice(0, file.Key.length-4);
    let link = url + name + '.jpg';
    data.push({
        name : file.Key.slice(4, file.Key.length-4),
        link: link
    });
  });
  
  getTags(newData, data)
  .then(()=>{
    console.log(newData);
    fs.writeFile("newtags.txt", JSON.stringify(newData), function(err) {
    });
  });

});
// let list = [];
// syncdb.getAllFiles(list).then((data)=>{
//   fs.writeFile("files.txt", JSON.stringify(list), function(err) {
//   });
// });

