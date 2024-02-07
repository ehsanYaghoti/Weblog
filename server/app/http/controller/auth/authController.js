const Controller = require('app/http/controller/controller')
const User = require('app/models/user');
const JWT = require('jsonwebtoken');
const passport = require('passport');
const config = require('../../../../config');


class AuthController extends Controller {
    async showLoginForm(req , res , next){
        try {

            return res.redirect(`${process.env.WEBSITE_FRONT_URL}/auth/login`)

            const title = 'ورود / ثبت نام'

            // react login page
            return res.json({
                data : 'this is login page',
                success : true
            })

            // res.render('home/auth/auth.ejs' , {title , recaptcha  : this.recaptcha.render() , categories})  
        } catch (err) {
            next(err);
        }
    }

    async showRegisterForm(req , res , next){
        try {

            return res.redirect(`${process.env.WEBSITE_FRONT_URL}/auth/register`)

            const title = 'ثبت نام'

            // react register page
            // console.log('this is register page')
            return res.json({
                data : 'this is register page',
                success : true
            })

            // res.render('home/auth/auth.ejs' , {title , recaptcha  : this.recaptcha.render() , categories})  
        } catch (err) {
            next(err);
        }
    }
    
    async apiLogin(req , res , next){
        let result = await this.validationResult(req)
        if(! result){
            return res.json({
                data : req.flash('validationMessage'),
                success : false
            })
        }

        passport.authenticate('local-login' , (err , user) => {
            if(err){ console.log(err)};
            if(! user){ return res.json({
                data : 'چنین کاربری وجود ندارد',
                success : false
            })}

            req.login(user , (err)=>{
                
                if(err){ console.log(err)};

                const token  = JWT.sign({id : user._id} , config.jsonwebtoken.secret_key , { expiresIn : '24h'})

                return res.json({
                    data : token,
                    success : true
                })
            })
        })(req , res , next)

    }
}



module.exports = new AuthController();