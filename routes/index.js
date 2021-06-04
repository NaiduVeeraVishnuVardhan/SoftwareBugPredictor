const express = require('express')
const router = express.Router()
const s3Controller = require('../controllers/s3Controller')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const appController = require('../controllers/appController')
const authController = require('../controllers/authController')
const isAuthenticated = require('../helpers/authHelper')

router.post('/api/reg', appController.repoLink)
router.get('/result', appController.resultPage)
router.get('/login', appController.loginPage)
router.get('/signup', appController.signupPage)

//Auth Routes
router.post('/login', authController.login)
router.get('/logout', isAuthenticated, authController.logout)
router.get('/user', isAuthenticated, authController.getUser)
router.post('/signup', authController.register)

router.get('/result', appController.resultPage)
router.post('/result', appController.repoLink)

//Add Results to a User
router.post('/api/addResult', isAuthenticated, appController.addResult)

router.post(
    '/s3/upload',
    upload.single('bugpredictorfile'),
    s3Controller.fileUploadToS3
)
router.get('/s3/download/:filekey', s3Controller.downloadFile)

module.exports = router
