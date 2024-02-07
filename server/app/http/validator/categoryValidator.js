const validator = require('./validator')
const { check } = require('express-validator')

class categoryValidator extends validator{
    handle(){
        return [
            check('name').isLength({min : 5 })
            .withMessage('نام دسته حداقل باید 5 کاراکتر باشد'),
        ]
    }
}



module.exports = new categoryValidator;