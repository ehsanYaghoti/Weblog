const database = require('./database');
const session = require('./session');
const service = require('./service');

module.exports = {
    database,
    session,
    service,
    jsonwebtoken: { 
        secret_key : 'jsonwebtokensecretkey' 
    },
    cookie_secretkey : 'cookiesecretkey',
    port : process.env.APPLICATIONPORT,
    website_url : process.env.WEBSITE_URL,
    debug : true,
}