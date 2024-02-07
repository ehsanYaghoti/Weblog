const validator = require('./validator')
const { check } = require('express-validator')
const User = require('app/models/user')

class resetPasswordValidator extends validator{
    handle(){
        return [

            check('token').not().isEmpty().withMessage('فیلد توکن موجود نمی باشد'),
            
            check('email').isEmail()
            .withMessage('فیلد ایمیل معتبر نیست')            
            .custom(async (value , {req})=> {

                const user = await User.findOne({email : value})
                if(! user){throw new Error('اطلاعات وارد شده صحیح نیست')}

            }).trim().escape(),
            
            check('password')
            .isStrongPassword({minLength : 8 , minLowercase : 1 , minUppercase : 1 , minNumbers : 1 , minSymbols : 0 , returnScore : false})
            .withMessage(' رمز عبور باید حداقل ۸ کاراکتر باشد و حداقل دارای ۱ حرف کوچک و حرف بزرک و عدد باشد.'),
            check('confirmpassword')
            .isStrongPassword({minLength : 8 , minLowercase : 1 , minUppercase : 1 , minNumbers : 1 , minSymbols : 0 , returnScore : false})
            .withMessage(' رمز عبور باید حداقل ۸ کاراکتر باشد و حداقل دارای ۱ حرف کوچک و حرف بزرک و عدد باشد.'),
        ]
    }
}



module.exports = new resetPasswordValidator;