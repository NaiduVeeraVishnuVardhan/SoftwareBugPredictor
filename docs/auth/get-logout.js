module.exports = {
    get:{
        tags:['Auth'],
        description: "Ends current login user auth session",
        responses:{
            200:{
                description: "redirects authenticated user to /login route"
            }
        }
    }
}