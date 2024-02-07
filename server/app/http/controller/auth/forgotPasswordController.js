const Controller = require('app/http/controller/controller');
const User = require('app/models/user');
const mail = require('app/helper/mail');
const PasswordReset = require('app/models/passwordReset')
const uniqueString = require('unique-string');
const config = require('../../../../config');
const Category = require('app/models/category');

class ForgotPassword extends Controller {

    async showForgotPasswordForm(req , res){
        const title = 'فراموشی رمز عبور'
        // const categories = await Category.find({}).populate('childrens').exec()

        return res.json({
            title ,
            data : 'forgot password form',
            info : 'ایمیل خود را وارد کنید',
            success : true
        })  
        
    }

    async forgotPasswordProcess(req , res ){
        // await this.recaptchaValidation(req , res)

        const result = await this.validationData(req , res)
        if(result){
            return this.sendResetLink(req , res )
        } else if(! result){
            return res.json({
                data :req.flash('validationMessage'),
                success : false
            })
        }

 
        // return this.back(req , res)
    }

    async sendResetLink(req , res){

        let user = await User.findOne({email : req.body.email })
        if(! user){
            req.flash('errors' , 'چنین ایمیلی وجود ندارد');

            return res.json({
                messages : req.flash('errors') ,
                success : false
            })
        }

        const newPasswordReset = new PasswordReset({
            email : req.body.email,
            token  : uniqueString(),

        })

        await newPasswordReset.save();

        const mailOptions  = {
            from: '"وبسایت وبلاگ 👻" <info@blog-project.ir>', // sender address
            to: `${newPasswordReset.email}`, // list of receivers
            subject: "بازیابی رمز عبور", // Subject line
           
            html:  `
                <h2>بازیابی رمز عبور</h2>
                <p>برای بازیابی رمز عبور روی لینک زیر کلیک کنید</p>
                <a href="${process.env.WEBSITE_FRONT_URL}/auth/password/reset?email=${newPasswordReset.email}&token=${newPasswordReset.token}">بازیابی رمز عبور</a>
            `, // html body
        }


        await mail.sendMail(mailOptions ,async (err , info)=>{
            if(err) {console.log(err)};

            console.log("Message sent: %s", info.messageId)

            return

        })

        return res.json({
            messages : 'ایمیل حاوی بازیابی لینک پسورد به ایمیل شما ارسال شد',
            success : false,
        })

        // return res.redirect('/auth/login')
        
    }
}



module.exports = new ForgotPassword();