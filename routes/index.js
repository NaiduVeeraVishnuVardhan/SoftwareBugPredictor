const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

router.post('/api/reg',appController.repoLink);
router.get('/result',appController.resultPage);
router.get('/login', appController.loginPage);
router.get('/signup', appController.signupPage);
module.exports = router;