const config = require('../../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const dbw = require('../db/wrapper').dbw;

const fbData = {
  clientID: config.auth.facebook.id,
  clientSecret: config.auth.facebook.secret,
  callbackURL: config.auth.facebook.callback,
  profileFields: config.auth.facebook.profileFields,
};

const facebook = new FacebookStrategy(fbData,
  (accessToken, refreshToken, profile, done) => {
    const firstname = profile.name.givenName || '';
    const lastname = profile.name.familyName || '';
    const user = {
      name: `${firstname} ${lastname}`,
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

module.exports = facebook;
