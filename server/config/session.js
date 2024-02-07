const MongoStore = require('connect-mongo');

module.exports = {
        name : 'blogproject_session',
        secret : process.env.SESSION_SECRETKEY ,
        resave : true,
        saveUninitialized : true,
        sameSite : false,
        cookie : { expires : new Date(Date.now() + 1000 * 60 * 60 * 24 * 1)},
        store : MongoStore.create({
            mongoUrl : 'mongodb://127.0.0.1:27017/blog-project'
        })
} 