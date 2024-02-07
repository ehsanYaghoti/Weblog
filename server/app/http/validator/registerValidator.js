const validator = require('./validator')
const { check } = require('express-validator')
const User = require('./../../models/user')

class registrtValidator extends validator{
    handle(){
        return [
            check('username').isLength({min : 5})
            .withMessage('نام کاربری باید حداقل ۵ کاراکتر باشد')
            .custom(async (value , {req})=> {

                const user = await User.findOne({username : value})
                if(user){throw new Error('چنین کاربری با این نام کاربری قبلا ثبت نام کرده است')}

            }).trim().escape(),
            
            check('email').isEmail()
            .withMessage('فیلد ایمیل معتبر نیست')            
            .custom(async (value , {req})=> {

                const user = await User.findOne({email : value})
                if(user){throw new Error('چنین کاربری با این ایمیل قبلا ثبت نام کرده است')}

            }).trim().escape(),
            
            check('password')
            .isStrongPassword({minLength : 8 , minLowercase : 1 , minUppercase : 1 , minNumbers : 1 , minSymbols : 0 , returnScore : false})
            .withMessage(' رمز عبور باید حداقل ۸ کاراکتر باشد و حداقل دارای ۱ حرف کوچک و حرف بزرک و عدد باشد.'),
        ]
    }
}



module.exports = new registrtValidator;