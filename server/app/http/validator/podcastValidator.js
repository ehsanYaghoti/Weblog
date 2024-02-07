const validator = require('./validator');
const { check } = require('express-validator');
const Podcast = require('app/models/podcast')


class podcastValidator extends validator{
    handle(){ 
        return [
            check('title').not().isEmpty()
            .withMessage('فیلد عنوان نباید خالی باشد')
            .trim().escape(),
            // .custom(async (value , {req})=> {

            //     const podcast = await Podcast.findOne({title : value})
            //     if(podcast){throw new Error('There is same podcast with this title try another title')}

            // }).trim().escape(),

            check('statement').not().isEmpty().isLength({min : 30})
            .withMessage('فیلد توضیح نباید خالی باشد و حداقل 30 کاراکتر باشد'),
            check('sound').not().isEmpty()
            .withMessage('فیلد صوت نباید خالی باشد')
            .trim().escape(),
            check('image').not().isEmpty()
            .withMessage('فیلد عکس نباید خالی باشد')
            .trim().escape(),
            check('tags').not().isEmpty()
            .withMessage('فیلد تگ ها نباید خالی باشد')
            .trim().escape(),
            check('categories').not().isEmpty()
            .withMessage('فیلد دسته بندی نباید خالی باشد')
            .trim().escape(),

        ]
    }
}



module.exports = new podcastValidator;