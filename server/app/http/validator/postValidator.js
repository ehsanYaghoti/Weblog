const validator = require('./validator');
const { check } = require('express-validator');
const Post = require('app/models/post')


class postValidator extends validator{
    handle(){ 
        return [
            check('title').not().isEmpty()
            .withMessage('فیلد عنوان نباید خالی باشد')
            .trim().escape(),
            // .custom(async (value , {req})=> {

            //     const post = await Post.findOne({title : value})
            //     if(post){throw new Error('There is same post with this title try another title')}

            // }).trim().escape(),

            check('statement').not().isEmpty().isLength({min : 50})
            .withMessage('فیلد توضیح نباید خالی باشد و حداقل 30 کاراکتر باشد'),
            
            check('tags').not().isEmpty()
            .withMessage('فیلد تگ ها نباید خالی باشد')
            .trim().escape(),
        ]
    }
}



module.exports = new postValidator;