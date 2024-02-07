const validator = require('./validator');
const { check } = require('express-validator');
const User = require('app/models/user')

class forgotPasswordValidator extends validator{
    handle(){
        return [
            check('email')
            .isEmail()
            .withMessage('فیلد ایمیل معتبر نیست')            
            .custom(async (value , {req})=> {

                const user = await User.findOne({email : value})
                if(! user){throw new Error('چنین ایمیلی در سایت ثبت نام نکرده است')}

            }).trim().escape()
            
        ]
    }
} 


module.exports = new forgotPasswordValidator;