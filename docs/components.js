module.exports = {
    components: {
        schemas: {
            username: {
                type: 'string', // data type
                description: 'username', // desc
                example: 'mark', // example of a user
            },
            user: {
                type: 'object', // data type
                properties: {
                    username: {
                        type: 'string', // data-type
                        description: 'username', // desc
                        example: 'mark', // exampl of a user
                    },
                    password: {
                        type: 'string', // data-type
                        description: 'user password', // desc
                        example: 'password##$123', // example of a passowrd entrey
                    },
                },
            },
            s3fileuploadObject:{
                type: 'object',
                properties:{

                    Etag:{
                        type: 'string', // data-type
                        description: 'The entity tag is a hash of the object. The ETag reflects changes only to the contents of an object, not its metadata. The ETag may or may not be an MD5 digest of the object data. Whether or not it is depends on how the object was created and how it is encrypted as described below:', // desc
                    },
                    Location:{
                        type: 'string', // data-type
                        description: 'the URL of the uploaded object', // desc
                    },
                    Key:{
                        type: 'string', // data-type
                        description: 'the key to which the object was uploaded', // desc
                    },
                    Key:{
                        type: 'string', // data-type
                        description: 'the key to which the object was uploaded', // desc
                    },
                    Bucket:{
                        type: 'string', // data-type
                        description: 'the bucket to which the object was uploaded', // desc
                    },

                }
            }
        },
    },
}
