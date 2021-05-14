const express = require('express')
const router = express.Router()
const appController = require('../controllers/appController')
const s3Controller = require('../controllers/s3Controller')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post('/api/reg', appController.repoLink)
router.get('/result', appController.resultPage)

router.post(
    '/s3/upload',
    upload.single('bugpredictorfile'),
    s3Controller.fileUploadToS3
)
router.get('/s3/download/:filekey', s3Controller.downloadFile)

module.exports = router
