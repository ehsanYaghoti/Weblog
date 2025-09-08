const express = require('express');
const router = express.Router();
const CORS = require('cors');

// Routers
const homeRouter = require('./home');
const adminRouter = require('./admin');
const authRouter = require('./auth');

// Middlewares
const redirectIfNotAdmin = require('app/http/middleware/redirectIfNotAdmin');
const apiAuthAdminJWT = require('app/http/middleware/apiAuthAdminJWT');


// CORS
let corsOptions = {
  origin: [ 'http://www.weblogg.ir'  , `${process.env.WEBSITE_URL}` , `${process.env.WEBSITE_FRONT_URL}` , ,'http://localhost:3000' ] ,
  allowedHeaders : ['Content-Type' ,'Authorization' , 'Origin' , 'Access-Control-Allow-Origin'],
  credentials : true,
  methods : 'GET,PUT,POST,DELETE'
}





// Auth routes
router.use('/auth' , CORS(corsOptions) , authRouter )


// Admin Routes
router.use('/admin'  , CORS(corsOptions) , redirectIfNotAdmin.handle  , apiAuthAdminJWT.handle  , adminRouter )
// , apiAuthJWT.handle

// Home routes
router.use('/' , CORS(corsOptions) , homeRouter )



module.exports = router
