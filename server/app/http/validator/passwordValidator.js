const validator = require('./validator');
const { check } = require('express-validator');
const User = require('../../models/user');

class passwordValidator extends validator{
    handle(){
        return [
            check('password')
            .isStrongPassword({minLength : 8 , minLowercase : 1 , minUppercase : 1 , minNumbers : 1 , minSymbols : 0 , returnScore : false})
            .withMessage(' رمز عبور باید حداقل ۸ کاراکتر باشد و حداقل دارای ۱ حرف کوچک و حرف بزرگ و عدد باشد.'),
        ]
    }
}



module.exports = new passwordValidator;