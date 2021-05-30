const login = require('./post-login')
const signup = require('./post-signup')
const logout = require('./get-logout')
const currentUser = require('./get-user')

module.exports = {
    '/login': { ...login },
    '/user': { ...currentUser },
    '/logout': { ...logout },
    '/signup': { ...signup },
}
