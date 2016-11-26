const syncdb = require('./server/files/s3');
const cloudVision = require('./server/cloudvision/cloudvision');
var fs = require('fs');

const data = [];
fs.readFile('files.txt', 'utf8', function (err,list) {
  let url = 'https://s3.eu-central-1.amazonaws.com/gifrun/'
  JSON.parse(list).forEach((file)=>{
    let fileObj = {
      name : file.Key.slice(0, file.Key.length-4),
    };
    let link = url + fileObj.name + '.jpg';
    console.log(link);
    // cloudVision(link)
    // .then((tags) => {
    //   fileObj.tags = tags;
    //   data.push(fileObj);
    //   fs.writeFile("tags.txt", JSON.stringify(data), function(err) {
    //     console.log(data);
    //   });
    // });
  });
});
  // let url = 'https://s3.eu-central-1.amazonaws.com/gifrun/'
  // list.forEach((file) => {
  //   let fileObj = {
  //     name : file.Key.slice(0, file.Key.length-3)
  //   };
  //   cloudVision(url + file.Key.slice(0, file.Key.length-3) + 'jpg')
  //   .then((tags) => {
  //     fileObj.tags = tags;
  //     data.push(fileObj);
  //     fs.writeFile("tags.txt", data, function(err) {
  //         if(err) {
  //             return console.log(err);
  //         }
  //     });
  //     console.log(data);
  //   });
  // });
