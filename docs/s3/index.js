const fileUpload = require('./post-fileupload')
const fileDownload = require('./get-filedownload')

module.exports = {
    '/s3/upload': { ...fileUpload },
    '/s3/download/{filekey}': { ...fileDownload },
}
