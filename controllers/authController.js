const express = require('express');
const passport = require('passport');
const isAuthenticated = require('../helpers/authHelper');
const { userSchema } = require('../models/user');
const mongo = require('../helpers/mongo');

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

            return res.redirect('/home');
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

module.exports = {
    register,
    login,
    logout,
    getUser
}