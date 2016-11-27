const dbw = require('../db/wrapper').dbw;
const config = require('../../config');

const stream = {

  filterReduce: (tags) => {
    let tagsData = tags.filter((a) => {
      delete a['mid'];
      delete a['score'];
      return a.desc;
    });

    return tagsData.reduce((a, b) =>{
      return a.concat(b);
    },[]);
  },

  random: (count) => {
    return new Promise((resolve, reject) => {
      dbw.find('gifs', {}, count)
      .then((data) => { 
        console.log(JSON.stringify(data));
        let newData = []
        for(let file of data) {
          newData.push({
            message: file.name,
            link: config.s3.prefix + file.name + '.gif',
            thumbnail: config.s3.prefix + file.name + '.jpg',
            tags: stream.filterReduce(file.tags)
          });
        }
        resolve(newData);
      });
    });
  }

};

module.exports = stream;