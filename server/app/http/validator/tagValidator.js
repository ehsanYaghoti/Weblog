const validator = require('./validator')
const { check } = require('express-validator')
const Tag = require('app/models/tag')

class tagValidator extends validator{
    handle(){
        return [
            check('name').not().isEmpty()
            .withMessage('فیلد عنوان نباید خالی باشد')
        ]
    }
}

 

module.exports = new tagValidator;