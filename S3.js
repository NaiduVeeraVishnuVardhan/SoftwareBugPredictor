require('dotenv').config()
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')

const bucketName = (process.env.AWS_BUCKET_NAME = 'softwarebug-deakin-group')
const region = (process.env.AWS_BUCKET_REGION = 'eu-west-2')
const accessKeyId = (process.env.AWS_ACCESS_KEY = 'AKIATZK4GTFBKWTUTSFF')
const secretAccessKey = (process.env.AWS_SECRET_KEY =
    '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')

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
})

exports.exists = async function (key) {
    return await s3
        .headObject({
            Bucket: bucketName,
            Key: key,
        })
        .promise()
        .then(
            () => true,
            (err) => {
                if (err.code === 'NotFound') {
                    return false
                }
                throw err
            }
        )
}

//uploads the file to s3
exports.uploadFile = function (file, username = 'dffdf') {
    const fileStream = fs.createReadStream(file.path)
    const filename = `${username}-${file.filename}`

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: filename,
    }

    return s3.upload(uploadParams).promise()
}

//Download file to gitbucket
exports.getFileStream = async function (filekey, username) {
    let filename

    //ensure the username is in the s3 bucket key field
    if (!filekey.includes(username)) {
        filename = `${username}-${filekey.trim()}`
    } else {
        filename = filekey
    }

    const downloadParams = {
        Key: filename,
        Bucket: bucketName,
    }

    try {
        let found = await s3
            .headObject(downloadParams)
            .promise()
            .then(
                () => true,
                (err) => {
                    if (err.code === 'NotFound') {
                        return false
                    }
                    throw err
                }
            )
        console.log(found)
        if (found) {
            return s3.getObject(downloadParams).createReadStream()
        }
    } catch (err) {
        console.log(`Err: ${err.code} with status code ${err.statusCode}`)
    }
}
