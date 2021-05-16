module.exports = {
    post:{
        tags:['File'],
        description: "uploads file to S3 bucket",
        requestBody:{
            content:{
                'multipart/form-data':{
                    schema:{
                        type: 'object',
                        properties:{
                            bugpredictorfile:{
                                type: 'string',
                                format: "binary"
                            }
                        }
                    } 
                }
            }
        },
        responses:{
            200:{
                description: "S3 bucket response",
                'application/json':{
                    schema:{
                        "$ref": '#/components/schemas/s3fileuploadObject'
                    }
                }
            }
        }
    }
}