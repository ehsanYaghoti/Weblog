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
                failureFlash : true,
            } )(req  , res , next)

        } catch (err) {
            throw err;
        }

    }

}


module.exports = new registerController();