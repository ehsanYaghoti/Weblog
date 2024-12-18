const express = require('express');
const app = express();
const http = require('http');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors'); 
const config = require('../config')
const { MongoClient , ServerApiVersion } = require('mongodb');

// Middlewares
const rememberMiddleware = require('app/http/middleware/loginMiddleware')
const activeationMiddleware = require('app/http/middleware/activeationMiddleware')


module.exports = class Application {
    constructor() {
        this.setupMongoose();
        this.setupExpress();
        this.setupConfig();
        this.setupRoutes();
    }

    setupExpress(){

        const port = process.env.PORT

        const server = http.createServer(app)
        server.listen(port , () => {
            console.log(`server is listening on port ${port}`)
        })
    }

    async setupMongoose(){

        await mongoose.connect(process.env.DATABASE_URI);

        // mongoose.connect(process.env.DATABASE_URI).then(() => {
        //     console.log('connected Mongodb')
        // }).catch(e => {
        //     console.log(e)
        // })

    
    }

    setupConfig(){

        //Passports
        require('app/passport/passport-local-login.js')
        require('app/passport/passport-local-register.js')
        require('app/passport/passport-google.js')
        require('app/passport/passport-jwt.js')

        // Security Configuration
        // app.use(helmet() );
        // app.use(cors());
        // app.use(
        //     cors({
        //     origin: [ 'http://weblogg.ir'  , `${process.env.WEBSITE_URL}` , `${process.env.WEBSITE_FRONT_URL}` , ,'http://localhost:3000' ] ,
        //     methods: ["GET", "POST" , "PUT" , "DELETE"],
        //     credentials: true,
        //     })
        // );

        //Body Parser Configuration
        app.use(express.json());
        app.use(express.urlencoded({extended : true}))

        //statics
        // app.use(express.static('public'));
        app.use('/public', express.static('public'));

        // Auth configuration
        app.use(cookieParser(process.env.COOKIE_SECRETKEY));
        app.use(session(config.session));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(rememberMiddleware.handle)

    }

    setupRoutes(){

        //Routes Midllewares
        app.use(require('./routes/api'))

    }

}
