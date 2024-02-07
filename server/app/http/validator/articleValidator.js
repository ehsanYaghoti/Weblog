const validator = require('./validator');
const { check } = require('express-validator');
const Article = require('app/models/article')

class registrtValidator extends validator{
    handle(){
        return [
            check('title').not().isEmpty()
            .withMessage('فیلد عنوان نباید خالی باشد')
            .trim().escape(),
            // .custom(async (value , {req})=> {

            //     const article = await Article.findOne({title : value})
            //     if(article){throw new Error('There is same article with this title try another title')}

            // }).trim().escape(),
            
            check('statement').not().isEmpty().isLength({min : 30})
            .withMessage('فیلد توضیح نباید خالی باشد و حداقل 30 کاراکتر باشد'),
            
            
            check('readingtime').not().isEmpty()
            .withMessage('فیلد مدت مطالعه نباید خالی باشد'),
            check('image').not().isEmpty()
            .withMessage('فیلد عکس نباید خالی باشد')
            .trim().escape(),
            check('categories').not().isEmpty()
            .withMessage('فیلد دسته بندی نباید خالی باشد')
            .trim().escape(),
            check('tags').not().isEmpty()
            .withMessage('فیلد تگ ها نباید خالی باشد')
            .trim().escape(),
        ]
    }
}



module.exports = new registrtValidator;