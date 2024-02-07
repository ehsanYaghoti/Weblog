const validator = require('./validator');
const { check } = require('express-validator');

class editUserValidator extends validator{
    handle(){
        return [
            check('username').isLength({min : 5})
            .withMessage('نام کاربری باید حداقل ۵ کاراکتر باشد')
            .trim().escape(),
            
            check('email').isEmail()
            .withMessage('فیلد ایمیل معتبر نیست')            
            .trim().escape(),
            
        ]
    }
}



module.exports = new editUserValidator;