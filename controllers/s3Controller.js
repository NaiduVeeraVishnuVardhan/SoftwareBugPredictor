const { uploadFile, getFileStream } = require('../S3')
const fs = require('fs')
const utils = require('util')
const unlinkFile = utils.promisify(fs.unlink)
module.exports = {
    async fileUploadToS3(req, res, next) {
        //get the file and username of authenticated user
        const file = req.file
        const username = req.user.username
        try {
            const result = await uploadFile(file, username)
            // removes from server after upload
            await unlinkFile(file.path)
            res.status(201).json({
                error: false,
                message: 'file store',
                result,
            })
        } catch (e) {
            res.status(500).json({
                error: true,
                message: 'File could not be uploaded',
            })
            console.log(e)
        }
    },
    async downloadFile(req, res) {
        const key = req.params.filekey
        const username = req.user.username

        try {
            console.log(username)
            const readStream = await getFileStream(key, username)

            console.log(readStream)
            readStream.pipe(res)
        } catch (e) {
            res.status(404).json({ error: true, message: 'file not found' })
        }
    },
}
