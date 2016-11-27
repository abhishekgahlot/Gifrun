const syncdb = require('./server/files/s3');
const cloudVision = require('./server/cloudvision/cloudvision');
var fs = require('fs');

const data = [];
const newData = [];
let i = 0;
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
  console.log(data.length);
  // let i = 0;
  // setInterval(() => {
  //   cloudVision(data[i].link)
  //   .then((tags) => {
  //     newData.push({
  //       name: data[i].name,
  //       tags: tags
  //     });
  //     fs.writeFile("newtags.txt", JSON.stringify(newData), function(err) {
  //     });
  //   });
  //   i += 1;
  // }, 1500);
});
// let list = [];
// syncdb.getAllFiles(list).then((data)=>{
//   fs.writeFile("files.txt", JSON.stringify(list), function(err) {
//   });
// });

