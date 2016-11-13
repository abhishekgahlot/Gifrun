const config = require('../../config');
const TwitterStrategy = require('passport-twitter').Strategy;
const dbw = require('../db/wrapper').dbw;

const twitter = new TwitterStrategy(config.auth.twitter,
  (accessToken, refreshToken, profile, done) => {
    const user = {
      name: profile.displayName || '',
      email: profile.emails.shift().value,
    };
    dbw.findPrimary(config.db.users.name, user.email)
    .then((data) => {
      if (!data) {
        dbw.insert('users', user)
        .then(() => {
          done(null, user);
          return;
        })
        .catch((err) => {
          done(err, null);
          return;
        });
      } else {
        done(null, user);
        return;
      }
    });
  }
);

module.exports = twitter;
