const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const authController = require('../controllers/authController');
const isAuthenticated = require('../helpers/authHelper');

router.post('/api/reg',appController.repoLink);
router.get('/result',appController.resultPage);

//Auth Routes
router.post('/login', authController.login);
router.get('/logout', isAuthenticated, authController.logout);
router.get('/user', isAuthenticated, authController.getUser);
router.post('/register', isAuthenticated, authController.register);

module.exports = router;