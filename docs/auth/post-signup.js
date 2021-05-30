module.exports = {
    post:{
        tags:['Auth'],
        description: "handles user signup",
        requestBody:{
            description: "username and password",
            content:{
                'application/json':{
                    schema:{'$ref':'#/components/schemas/user'}
                }
            }
        },
        responses:{
            200:{
                description: "redirects authenticated user to /login route"
            }
        }
    }
}