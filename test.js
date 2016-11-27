const syncdb = require('./server/files/s3');
const cloudVision = require('./server/cloudvision/cloudvision');
let list = [];
// syncdb.getAllFiles(list).then((data)=>{
//   console.log(list);
// });


cloudVision('https://s3.eu-central-1.amazonaws.com/gifrun/img/d4a2f3c1c731f0abf581e31e1b6fcd55.jpg')
.then((data) => {
  console.log(data);
})

// 683a4f51b62abd9a4563de4e144c74f9

// var fs = require('fs');
// let data = [];
// fs.readFile('tags.txt', 'utf8', function (err,list) {
//   data = list;
//   x = JSON.parse(data).filter((a)=> {
//     return a.name === '005157a4fe997830c2c468abef20a0b7'
//   });
//   console.log(JSON.stringify(x));
// });

// {"name":"5c66ad9b0f95c850caaa1c518794f8b4",
// "tags":[ { desc: 'image', mid: '/m/0jg24', score: 90.214467 },
//   { desc: 'furniture', mid: '/m/0c_jw', score: 75.198758 },
//   { desc: 'cat', mid: '/m/01yrx', score: 72.08563099999999 },
//   { desc: 'art', mid: '/m/0jjw', score: 67.85562 },
//   { desc: 'bed', mid: '/m/03ssj5', score: 64.244878 } ]}