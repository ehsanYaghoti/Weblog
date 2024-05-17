const controller = require('app/http/controller/controller.js')
const User = require('app/models/user')
const passport = require('passport')
const ActiveationCode = require('app/models/activeationCode')
const uniqueString = require('unique-string');
const mail = require('app/helper/mail');
const JWT = require('jsonwebtoken');
const config = require('../../../../config');


class loginController extends controller {
    async loginProcess(req , res , next){
        // await this.recaptchaValidation(req , res)
        const result = await this.validationData(req , res)
        if(result){
            return this.login(req , res , next)
        } else if(! result){
            return res.json({
                messages : req.flash('validationMessage'),
                success : result , 
            })
        }


    }


    async login(req , res , next){
        try {
            passport.authenticate('local.login' , async  (err , user)=>{
                if(! user){  
                    return res.json({
                        messages : req.flash('validationMessage'),
                        success : false , 
                    })
                }


                req.login(user , async err => { 

                    if(err){console.log(err)}
                    if(req.body.rememberme){
                        user.setRememberToken(res , 90);
                        user.setApiToken(res , 30 )
                        // const token  = JWT.sign({id : user._id} , config.jsonwebtoken.secret_key , { expiresIn : '90d'})
                        // res.cookie('api_token' , token , {sameSite : false , maxAge : 1000 * 60 * 60 * 24 * 30 * 3 , path : '/' , httpOnly : true , signed : true})
                    }

                    // if(user.email === process.env.MANAGER_EMAIL ){
                    //     console.log(user.email)
                    //     console.log(process.env.MANAGER_EMAIL)

                    //     user.admin = true
                    //     user.roles = [
                    //         'manager'
                    //     ]
                    // }

                    if(user.admin){
                        const token  = JWT.sign({id : user._id} , config.jsonwebtoken.secret_key , { expiresIn : '180d'})
                        res.cookie('api_admin_token' , token , {sameSite : false , maxAge : 1000 * 60 * 60 * 24 * 30 * 6 , path : '/admin' , httpOnly : true , signed : true})
                    }
 

                    return res.redirect('/');
                })


            })(req  , res , next)


            

        } catch (err) {
            console.log(err) ;
            next()
        }

    }

}



module.exports = new loginController();