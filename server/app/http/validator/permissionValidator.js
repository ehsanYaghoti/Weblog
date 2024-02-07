const validator = require('./validator');
const { check } = require('express-validator');


class permissionValidator extends validator{
    handle(){
        return [
            check('name').not().isEmpty()
            .withMessage('فیلد عنوان نباید خالی باشد')
            .trim().escape(),
            check('label').not().isEmpty()
            .withMessage('فیلد برچسب نباید خالی باشد')
            .trim().escape(),
        ]
    }
}



module.exports = new permissionValidator;