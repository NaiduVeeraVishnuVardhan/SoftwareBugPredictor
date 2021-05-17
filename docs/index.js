const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const auth = require('./auth');
const s3 = require('./s3')
const paths = Object.assign({}, s3,auth)

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    paths,
};