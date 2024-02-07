const validator = require('./validator')
const { check } = require('express-validator')

class reportValidator extends validator{
    handle(){
        return [
            check('title').not().isEmpty()
            .withMessage('فیلد عنوان نباید خالی باشد')
        ]
    }
}

 

module.exports = new reportValidator;