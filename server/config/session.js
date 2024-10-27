const MongoStore = require('connect-mongo');

module.exports = {
        name : 'blogproject_session',
        secret : process.env.SESSION_SECRETKEY ,
        resave : true,
        saveUninitialized : true,
        sameSite : false,
        cookie : { expires : new Date(Date.now() + 1000 * 60 * 60 * 24 * 1)},
        store : MongoStore.create({
            mongoUrl : 'mongodb+srv://eeehhssaannn:9w5kyzSPD1VCbAHu@cluster0.xbjlc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
        })
} 