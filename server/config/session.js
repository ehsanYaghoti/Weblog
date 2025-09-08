const MongoStore = require('connect-mongo');

module.exports = {
        name : 'blogproject_session',
        secret : process.env.SESSION_SECRETKEY ,
        resave : true,
        saveUninitialized : true,
        sameSite : false,
        cookie : { expires : new Date(Date.now() + 1000 * 60 * 60 * 24 * 1)},
        store : MongoStore.create({
            mongoUrl : process.env.DATABASE_URI
        })
}
