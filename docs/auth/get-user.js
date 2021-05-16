module.exports = {
    get:{
        tags:['Auth'],
        description: "returns the current user authenticated in application",
        responses:{
            200:{
                description: "current user object"
            }
        }
    }
}