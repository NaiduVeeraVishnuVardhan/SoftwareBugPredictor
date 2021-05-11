const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

router.post('/api/reg',appController.repoLink);
router.get('/result',appController.resultPage);
module.exports = router;