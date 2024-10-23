const express = require('express');
const router = express.Router();
const CORS = require('cors')
const JWT = require('jsonwebtoken');
const config = require('./../../../config');

// Routers
const homeRouter = require('./home');
const adminRouter = require('./admin');
const authRouter = require('./auth');

// Middlewares
const redirectIfNotAdmin = require('app/http/middleware/redirectIfNotAdmin');
const apiAuth = require('app/http/middleware/apiAuth');
const apiAuthJWT = require('app/http/middleware/apiAuthJWT');
const apiAuthAdminJWT = require('app/http/middleware/apiAuthAdminJWT');


// CORS
let whitelist = ['http://localhost:3000' , 'http://localhost:5000' , 'http://192.168.43.198:3000/']
let corsOptions = {
  origin: ['http://localhost:3000' , 'http://192.168.43.198:3000' , 'http://26.44.39.27:3000' , 'http://192.168.1.113:3000'] ,
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