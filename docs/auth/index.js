const login =  require('./post-login')
const signup =  require('./post-signup')
const logout = require('./get-logout')

module.exports = {
    paths: {
        '/login': { ...login},
        '/user': {},
        '/logout': {...logout},
        '/signup': {...signup},
    },
}
