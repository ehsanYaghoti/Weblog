const express =  require('express')
const router = express.Router();
const passport = require('passport');
const CORS = require('cors')
const JWT = require('jsonwebtoken');
const config = require('../../../config');

// Controllers
const authController = require('app/http/controller/auth/authController')
const registerController = require('app/http/controller/auth/registerController')
const loginController = require('app/http/controller/auth/loginController')
const forgotPasswordController = require('app/http/controller/auth/forgotPasswordController')
const resetPasswordController = require('app/http/controller/auth/resetPasswordController')



// Validators
const registerValidator = require('app/http/validator/registerValidator')
const loginValidator = require('app/http/validator/loginValidator');
const forgotPasswordValidator = require('app/http/validator/forgotPasswordValidator');
const resetPasswordValidator = require('app/http/validator/resetPasswordValidator');




// Middlewares
const apiAuthJWT = require('app/http/middleware/apiAuthJWT');
const redirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');

// CORS Configuration
let whitelist = ['http://localhost:3000' , 'http://localhost:5000']
let corsOptions = {
  origin:  'http://localhost:3000' ,
  allowedHeaders : ['Content-Type' ,'Authorization' , 'Origin' , 'Access-Control-Allow-Origin'],
  credentials : true,
  methods : 'GET,PUT,POST,DELETE'

}

//
//Routes
//

// 
//  local Authentication Routes 
// 

// login routes
router.options('/login' , CORS(corsOptions))
router.get('/login' ,  CORS(corsOptions)  , redirectIfAuthenticated.handle  , authController.showLoginForm );

router.options('/login' , CORS(corsOptions))
router.post('/login'  , CORS(corsOptions) , loginValidator.handle() , loginController.loginProcess);

// register routes
router.options('/register' , CORS(corsOptions))
router.get('/register-email' ,  CORS(corsOptions) , redirectIfAuthenticated.handle ,  authController.showRegisterForm);

router.options('/register' , CORS(corsOptions))
router.post('/register' , CORS(corsOptions)  , registerValidator.handle() , registerController.registerProcess);


// 
//  Logout Route 
// 

router.post('/logout' , (req , res)=> {
    req.logout(
        function(err) {
        if (err) { return res.status(500).json({
            data : err , 
            success : false
        }); }

        res.clearCookie('remember_token');
        res.clearCookie('api_token');
        
        return res.status(200).json({
            success : true
        })
    });

})

 

//Forgot Password Routes
router.get('/forgotpassword' , forgotPasswordController.showForgotPasswordForm);
router.options( '/forgotpassword' , CORS(corsOptions))
router.post('/forgotpassword' , CORS(corsOptions) ,  forgotPasswordValidator.handle() ,  forgotPasswordController.sendResetLink);

//Reset Password Routes
router.options( '/password/reset' , CORS(corsOptions)) 
router.get('/password/reset/:token' , CORS(corsOptions) , resetPasswordController.showResetPasswordForm);
router.post('/password/reset' , CORS(corsOptions) , resetPasswordValidator.handle() ,  resetPasswordController.resetPasswordProcess);



//google
router.get('/google' , passport.authenticate('google' , {scope : ['profile' , 'email']}));
router.get('/google/callback' , passport.authenticate('google' , {
    failureRedirect : '/auth/register'
})  , (req , res , next) => {
    req.user.setOatuhToken(res , 90)
    if(req.user.admin){
        const token  = JWT.sign({id : req.user._id} , config.jsonwebtoken.secret_key , { expiresIn : '180d'})
        res.cookie('api_admin_token' , token , {sameSite : false , maxAge : 1000 * 60 * 60 * 24 * 30 * 6 , path : '/admin' , httpOnly : true , signed : true})
    }
    next()
}   , ( req , res ) => {
    return res.redirect('/')
} )

module.exports = router;