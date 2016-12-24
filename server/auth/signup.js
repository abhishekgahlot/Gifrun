const dbw = require('../db/wrapper').dbw;
const bcrypt = require('bcrypt');
const config = require('../../config');

function hashPass(password, rounds) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, rounds, (err, hash) => {
      if (err) { reject(err); return; }
      resolve(hash);
    });
  });
}

function signup(body) {
  return new Promise((resolve, reject) => {
    const data = {
      fullName: body.fullName,
      email: body.email,
      password: body.password,
    };
    hashPass(data.password, config.saltRounds).then((hash) => {
      data.password = hash;
      dbw.insert('users', data).then(() => {
        resolve(true);
      }).catch((err) => {
        if (err.code === 11000) { // duplicate key
          reject('duplicate');
        } else {
          reject(err.code);
        }
      });
    });
  });
}

module.exports = {
  signup,
};
