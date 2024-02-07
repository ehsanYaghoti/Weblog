const middleware = require('./middleware')
const User = require('app/models/user')
const apiAuthJWT = require('app/http/middleware/apiAuthJWT');

class RememberLogin extends middleware {
    handle(req , res , next){
        // console.log(req.isAuthenticated())
        if(! req.isAuthenticated()) {
            const RememberToken = req.signedCookies.remember_token
            const ApiToken = req.signedCookies.api_token
            const OathToken = req.signedCookies.oath_token

            if(RememberToken) { 
                return this.findUser(RememberToken , req , res , next) 
            } else if(OathToken) { 
                return this.findUserOath(OathToken , req , res , next) 
            }
            else if(ApiToken) { 
                return this.findUserApi(ApiToken , req , res , next) 
            } else {
                return this.clearCookies(req , res , next)
            }   


        }

        next();
    }

    findUser (remembertoken , req , res  , next){
        // console.log(rememberToken)
        User.findOne({remembertoken : remembertoken})
        .then(user => {
            // console.log(user)

            if(user){
                req.login(user , err=> {
                    if(err){next(err)};
                    console.log('cookie is working')
                    next();
                })
            } else {
                res.clearCookie('remember_token');
                res.clearCookie('api_token');
                res.clearCookie('api_admin_token');
                
                next();
            }

        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }
    findUserApi( apitoken , req , res  , next){
        apiAuthJWT.handle(req , res , next)
        User.findOne({apitoken : apitoken})
        .then(user => {
            console.log(user)
            if(user){
                req.login(user , err=> {
                    if(err){next(err)};
                    console.log('cookie is working')
                    next();
                })
            } else {
                res.clearCookie('remember_token');
                res.clearCookie('api_token');
                res.clearCookie('api_admin_token');
                res.clearCookie('oath_token');
                
                next();
            }

        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    findUserOath( OathToken , req , res  , next){
        // console.log(rememberToken)
        User.findOne({oathToken : OathToken})
        .then(user => {
            // console.log(user)
            if(user){
                req.login(user , err=> {
                    if(err){next(err)};
                    console.log('cookie is working')
                    next();
                })
            } else {
                res.clearCookie('remember_token');
                res.clearCookie('api_token');
                res.clearCookie('api_admin_token');
                res.clearCookie('oath_token');
                
                next();
            }

        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    clearCookies( req , res  , next){

        res.clearCookie('remember_token');
        res.clearCookie('api_token');
        res.clearCookie('api_admin_token');
        res.clearCookie('oath_token');
        
        next();
    }
}


module.exports = new RememberLogin;