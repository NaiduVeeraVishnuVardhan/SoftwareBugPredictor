const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/', function(req, res) {
  res.render('auth');
});

const port = process.env.PORT || 8000;
app.listen(port , () => console.log('App listening on port ' + port));
const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '107493522406-199gbqob9v7e5u4rfktqrggo0tfnsnav.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'fzc6cpSmAJrIfVXpTqDGbj2z';
passport.use(new GoogleStrategy({
    clientID: '107493522406-199gbqob9v7e5u4rfktqrggo0tfnsnav.apps.googleusercontent.com',
    clientSecret: 'fzc6cpSmAJrIfVXpTqDGbj2z',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });