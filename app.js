const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const auth = require('./server/auth/auth');
const passport = require('passport');
const utils = require('./utils');
const config = require('./config');
const bluebird = require('bluebird');
const database = require('./server/db/interface');
const dbw = require('./server/db/wrapper').dbw;

global.Promise = bluebird;


/*
  App prequisites
*/

const log = utils.log;
const app = express();
app.use(bodyParser.json());
app.use(expressValidator([]));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({ store: new RedisStore(),
                  secret: 'ilovescotchscotchyscotchscotch',
                  saveUninitialized: true,
                  resave: true,
                }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.engine('.html', require('ejs').renderFile);

app.set('views', path.join(__dirname, 'app/'));


/*
  Main Route
*/

app.use(express.static('app')); // only for development
app.use('/bower_components', express.static('bower_components'));

const dir = 'app';
// app.use(express.static('dist')); for prod
// const dir = dist;

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: dir });
});


/*
  App route
*/

app.get('/app', (req, res) => {
  if (req.user) {
    // res.sendFile('app.html', { root: dir });
    res.render('app.html', { user: req.user });
  } else {
    res.redirect('/');
  }
});


/*
  Get user object if logged in.
*/

app.get('/user', (req, res) => {
  res.send(req.user);
});


/*
  Social auth
*/

passport.use(auth.facebook);
passport.use(auth.twitter);
passport.use(auth.google);

app.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/login/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/' })
);

app.get('/login/twitter', passport.authenticate('twitter', { scope: ['email'] }));
app.get('/login/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/' })
);

app.get('/login/google', passport.authenticate('google', { scope: ['email'] }));
app.get('/login/google/callback',
  passport.authenticate('google', { successRedirect: '/', failureRedirect: '/' })
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  dbw.findPrimary('users', email)
  .then((user) => {
    done(null, user);
  })
  .catch((err) => {
    done(err, null);
  });
});


/*
  Signin Route with Validation
*/

app.get('/signin', (req, res) => {
  res.sendFile('signin.html', { root: dir });
});

app.post('/signin', (req, res) => {
  req.checkBody('email', 'Invalid postparam').notEmpty();
  req.checkBody('password', 'Invalid postparam').notEmpty();
  if (req.validationErrors()) {
    res.json({ err: 'Invalid param' });
    return;
  }
  auth.signin(req.body).then((data) => {
    res.json({ auth: data });
  }).catch((err) => {
    res.json({ err });
  });
  return;
});


/*
  Signup Route with Validation
*/

app.get('/signup', (req, res) => {
  res.sendFile('signup.html', { root: dir });
});

app.post('/signup', (req, res) => {
  auth.signup(req.body).then((data) => {
    res.json({ auth: data });
  }).catch((err) => {
    if (err === 'duplicate') {
      res.json({ err });
    } else {
      res.json({ err });
    }
  });
});


/*
  Logout to kill session
*/

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/files', (req, res) => {
  dbw.find('gifs', {}, 20).then((data) => {
    let newData = []
    for(let file of data) {
      newData.push({
        message: file.name,
        link: config.s3.prefix + file.name + '.gif'
      });
    }
    res.json(newData);
  })
});

/*
  Start app after db connection is available
*/
database.prepareDB(database.db).then(() => {
  app.listen(config.port, () => {
    global.db = database.db;
    log(`Listening on ${config.port}`);
  });
});
