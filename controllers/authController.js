const express = require('express');
const passport = require('passport');
const isAuthenticated = require('../helpers/authHelper');
const { userSchema } = require('../models/user');
const mongo = require('../helpers/mongo');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');

const router = express.Router();

// Routes
const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect(`/login?info=${info.message}`);
    }

    req.logIn(user, () => {
      if (err) {
        return next(err);
      }

      return res.redirect('/');
    });
    return null;
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout();
  res.redirect('/login');
};

const getUser = (req, res) => {
  res.send({ user: req.user })
};

const register = (req, res) => {
  const { username, password } = req.body;

  const UserDetails = mongo.model('User', userSchema);

  UserDetails.register({ username, active: false }, password);
  res.redirect("/login/")

};

const forgotPassword = (req, res, next) => {
  const { email } = req.body;
  const User = mongo.model('User', userSchema);

  async.waterfall([
    function (done) {
      crypto.randomBytes(4, function (err, buf) {
        var new_password = buf.toString('hex');
        done(err, new_password);
      });
    },
    function (new_password, done) {
      User.findOne({ username: email }, function (err, user) {
        if (!user) {
          return res.render(
            'forgot',
            {
              error: 'No account with that email address exists.',
              info: false
            }
          );
        }

        user.setPassword(new_password, (err, u) => {
          if (err) return next(err);
          user.save(function (err) {
            done(err, new_password, user);
          });
        });

      });
    },
    function (new_password, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
      });

      var mailOptions = {
        to: user.username,
        from: 'dparikh338@gmail.com',
        subject: 'Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Your new password : ' + new_password + '\n'
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        if (err) done(err, 'done');
        return res.render(
          'forgot',
          { info: 'An reset password has been sent to ' + user.username + '.\n' + 'Please check your email' }
        )
      });

    }
  ], function (err) {
    if (err) return next(err);
    return res.render(
      'forgot',
      {
        error: 'Internal server error',
        info: false
      }
    );
  });

};

module.exports = {
  register,
  forgotPassword,
  login,
  logout,
  getUser
}