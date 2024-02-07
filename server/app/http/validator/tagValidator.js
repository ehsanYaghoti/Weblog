const validator = require('./validator')
const { check } = require('express-validator')

class tagValidator extends validator{
    handle(){
        return [
            check('name').not().isEmpty()
            .withMessage('فیلد عنوان نباید خالی باشد')
        ]
    }
}

 

module.exports = new tagValidator;