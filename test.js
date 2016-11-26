const syncdb = require('./server/files/s3');
const cloudVision = require('./server/cloudvision/cloudvision');
let list = [];
// syncdb.getAllFiles(list).then((data)=>{
//   console.log(list);
// });


cloudVision('https://s3.eu-central-1.amazonaws.com/gifrun/img/fcc0c69e7fe3ca7def6bde0898601f59.jpg')
.then((data) => {
  console.log(data);
})