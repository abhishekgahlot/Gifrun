const syncdb = require('./server/files/s3');
const cloudVision = require('./server/cloudvision/cloudvision');
let list = [];
// syncdb.getAllFiles(list).then((data)=>{
//   console.log(list);
// });


cloudVision('https://s3.eu-central-1.amazonaws.com/gifrun/img/005157a4fe997830c2c468abef20a0b7.jpg')
.then((data) => {
  console.log(data);
})