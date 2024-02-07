const validator = require('./validator');
const { check } = require('express-validator');
const User = require('../../models/user');

class newPasswordValidator extends validator{
    handle(){
        return [
            check('newPassword')
            .isStrongPassword({minLength : 8 , minLowercase : 1 , minUppercase : 1 , minNumbers : 1 , minSymbols : 0 , returnScore : false})
            .withMessage(' رمز عبور باید حداقل ۸ کاراکتر باشد و حداقل دارای ۱ حرف کوچک و حرف بزرک و عدد باشد.'),
            
            check('newPasswordRepeat')
            .custom(( value , { req } ) => {
                    console.log(value , 'and' , req.body.newPassword)
                if(value !== req.body.newPassword){

                    throw new Error('تکرار رمز عبور برابر نیست')
                }else {
                    return value;
                }
            })

        
        ]
    }
}



module.exports = new newPasswordValidator;