const validator = require('./validator')
const { check } = require('express-validator')
const User = require('app/models/user')

class commentValidator extends validator{
    handle(){
        return [
            check('statement').isLength({min : 5 , max : 50})
            .withMessage('کامنت حداقل باید 5 کاراکتر باشد و حداکثر 50 کاراکتر باشد')
            .trim().escape(),
        ]
    }
}



module.exports = new commentValidator;