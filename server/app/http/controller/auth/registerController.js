const controller = require('app/http/controller/controller')
const User = require('app/models/user')
const passport = require('passport');
const JWT = require('jsonwebtoken');
const config = require('../../../../config');


class registerController extends controller {
    async registerProcess(req , res , next){
        // await this.recaptchaValidation(req , res)
        const result = await this.validationData(req , res)
        if(result){
            this.register(req , res , next)
        } else if(! result) {
            return res.json({
                messages : req.flash('validationMessage') ,
                fullMessages : req.flash('fullValidationMessages'),
                success : result , 
            })
        }


    }


    async register(req , res , next ){
        try {

             



            passport.authenticate('local.register' , {
                failureRedirect : '/auth/register',
                successRedirect : '/auth/login',
                successFlash : true,
                // successReturnToOrRedirect : '/',
                failureFlash : true,
            } )(req  , res , next)

            // const token  = JWT.sign({id : req.user._id} , config.jsonwebtoken.secret_key , { expiresIn : '90d'})
            // console.log(token)
            // res.cookie('api_token' , 'token'  , {sameSite : false , maxAge : 1000 * 60 * 60 * 24 * 30 * 3 , httpOnly : true , signed : true})

            // res.redirect('/auth/login')
            // req.login(req.user , err => { 
            //     if(err){console.log(err)}

            // })

            // return this.back(req , res)


            // res.redirect('/auth/login')
            // return res.redirect('/')
            // res.redirect('/')
            // return console.log('register completed')
            // console.log()
            // return res.json({
            //     data : 'success',
            //     response : 'res'
            // })

        } catch (err) {
            throw err;
        }

    }

}


module.exports = new registerController();