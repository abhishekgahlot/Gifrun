const dbw = require('../db/wrapper').dbw;
const config = require('../../config');

const stream = {

  filterReduce: (tags) => {
    let tagsData = tags.filter((a) => {
      delete a['mid'];
      delete a['score'];
      a['name'] = a['desc'];
      delete a['desc']
      return a.name;
    });

    return tagsData.reduce((a, b) =>{
      return a.concat(b);
    },[]);
  },

  formatData: (data) => {
    let newData = []
    for(let file of data) {
      newData.push({
        message: file.name,
        link: config.s3.prefix + file.name + '.gif',
        thumbnail: config.s3.prefix + file.name + '.jpg',
        tags: stream.filterReduce(file.tags)
      });
    }
    return newData;
  },

  random: (count) => {
    return new Promise((resolve, reject) => {
      dbw.find('gifs', {}, count)
      .then((data) => { 
        resolve(stream.formatData(data));
      });
    });
  }

};

module.exports = stream;