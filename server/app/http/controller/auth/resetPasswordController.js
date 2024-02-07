const Controller = require('app/http/controller/controller')
const User = require('app/models/user');
const PasswordReset = require('app/models/passwordReset')
const Category = require('app/models/category');


class ForgotPassword extends Controller {

    async showResetPasswordForm(req , res){

        // const categories = await Category.find({})

        const title = 'بازیابی رمز عبور'
        const token = req.params.token

        res.json({
            messages : 'reset password form',
            title,
            token,
            info : 'ایمیل و رمز عبور جدید را وارد کنید'
        })

        // res.render('home/auth/passwordReset' , {title , categories , token , recaptcha  : this.recaptcha.render()})    
        
    }

    async resetPasswordProcess(req , res ){
        // await this.recaptchaValidation(req , res)
        const result = await this.validationData(req , res)
        if(result){
            return this.resetPassword(req , res )
        } else if(! result){
            return res.json({
                messages : req.flash('validationMessage'),
                success : false
            })
        }

 
        // return this.back(req , res)
    }

    async resetPassword(req  , res) {
        let field = await PasswordReset.findOne({$and : [{email : req.body.email } , {token : req.body.token}]})

        if(! field){
            req.flash('validationMessage' , 'اطلاعات وارد شده صحیح نمی باشند')
            return res.json({
                messages : req.flash('validationMessage'),
                success : false
            })
            return this.back(req , res)
        }

        if(field.use){
            req.flash('validationMessage' , 'از این لینک بازیابی رمز عبور قبلا استفاده شده است')
            return res.json({
                messages : req.flash('validationMessage'),
                success : false
            })
            return this.back(req , res)
        }

        let user =await User.findOne({email : field.email})

        if(! user){
            req.flash('validationMessage' , 'چنین کاربری با این ایمیل وجود ندارد')
            return res.json({
                messages : req.flash('validationMessage'),
                success : false
            })
            return this.back(req , res)
        }


        await user.$set({password : user.hashPassword(req.body.password)});
        await user.save();

        await field.updateOne({use : true})

        console.log('message :' + 'reset password is successful')

        // await this.sweetAlert(req , {
        //     title : '',
        //     message : 'بازیابی رمز عبور با موفقیت انجام شد',
        //     type : 'success',
        //     button : 'باشه'
        // })

        return res.json({
            messages : 'بازیابی رمز عبور با موفقیت انجام شد',
            success : true
        })

        return res.redirect('/auth/login')

    }

}



module.exports = new ForgotPassword();