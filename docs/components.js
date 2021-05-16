module.exports = {
    components: {
        schemas: {
            // id model
            username: {
                type: 'string', // data type
                description: 'An id of a todo', // desc
                example: 'tyVgf', // example of an id
            },
            // todo model
            user: {
                type: 'object', // data type
                properties: {
                    username: {
                        type: 'string', // data-type
                        description: 'username', // desc
                        example: 'mark', // example of an id
                    },
                    password: {
                        type: 'string', // data-type
                        description: 'user password', // desc
                        example: 'password##$123', // example of a title
                    },
                },
            },
        },
    },
}
