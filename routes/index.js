const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const authController = require('../controllers/authController');
const isAuthenticated = require('../helpers/authHelper');

router.post('/api/reg',appController.repoLink);
router.get('/result',appController.resultPage);
router.get('/login', appController.loginPage);
router.get('/signup', appController.signupPage);

//Auth Routes
router.post('/login', authController.login);
router.get('/logout', isAuthenticated, authController.logout);
router.get('/user', isAuthenticated, authController.getUser);
router.post('/signup', authController.register);


//Add Results to a User
router.post('/api/addResult', isAuthenticated, appController.addResult);

module.exports = router;