const validator = require('./validator');
const { check } = require('express-validator');

class userValidator extends validator{
    handle(){
        return [

            check('avatar').not().isEmpty()
            .withMessage('فیلد عکس آواتار نباید خالی باشد')
            .trim().escape(),

            check('username').isLength({min : 5})
            .withMessage('نام کاربری باید حداقل ۵ کاراکتر باشد')
            .trim().escape(),
            
            check('email').isEmail()
            .withMessage('فیلد ایمیل معتبر نیست').trim().escape(),
            
            check('fullname').isLength({min : 5})
            .withMessage('نام و نام خانوادگی باید حداقل ۵ حرف باشد')
            .escape(),
                    
        ]
    }
}



module.exports = new userValidator;