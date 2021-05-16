const login =  require('./post-login')

module.exports = {
    paths: {
        '/login': { ...login},
        '/user': {},
        '/logout': {},
        '/signup': {},
    },
}
