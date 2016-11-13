const signin = require('./signin').signin;
const signup = require('./signup').signup;
const facebook = require('./facebook');
const twitter = require('./twitter');
const google = require('./google');

module.exports = {
  signin,
  signup,
  facebook,
  twitter,
  google,
};
