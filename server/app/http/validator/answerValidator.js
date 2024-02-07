const validator = require('./validator');
const { check } = require('express-validator');


class answerValidator extends validator{
    handle(){ 
        return [
            check('title').not().isEmpty()
            .withMessage('فیلد عنوان نباید خالی باشد')
            .trim().escape(),
            check('content').not().isEmpty().isLength({min : 10})
            .withMessage('فیلد پاسخ نباید خالی باشد و حداقل 10 کاراکتر باشد')
            .trim().escape(),

        ]
    }
}



module.exports = new answerValidator;