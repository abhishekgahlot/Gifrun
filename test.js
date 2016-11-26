const syncdb = require('./server/files/s3');
let list = [];
syncdb.getAllFiles(list).then((data)=>{
  console.log(list.length, list)
})
