const Controller = require('../controller');
const Like = require('app/models/like');
const Article = require('app/models/article');





class likeController extends Controller {

    async index(req , res , next){ 
        try {
        // console.log(req.query)

        const options = {
            page :  req.query.page || 1 ,
            limit : req.query.limit || 10 ,
            sort : { title : req.query.sortArticleName } ,
            // select :  '_id title  categories user' ,
            populate : [
            {path : 'user' , select : '_id username'} , 
            {path : 'article' , select : '_id title slug'} ,
            {path : 'podcast' , select : '_id title slug'} ,
            {path : 'comment' , select : '_id title slug statement media mediaModel' , populate : {path : 'media' , select : 'title slug'}} ,

            ]

        }
 

        
        let likes = await Like.paginate({} , options)

        console.log(likes)
        if(likes.docs.length === 0){ return res.json({ 
            data : ' لایک جهت نمایش وجود ندارد' , 
            success : false
        })}

        // console.log(likes)


        return res.json({
            data :  likes ,
            authenticatedUser : req.user ,
            isAuthenticated : req.isAuthenticated() ,
            success : true
        })
    } catch (err) {
        console.log(err)
        res.json({
            data :  err ,
            success : false
        })
        next();
      }
    }

    async delete(req , res , next) {
        try {
            this.isMongoId(req.params.id)
            const like = await Like.findById(req.params.id)

            if(! like){ 
                return res.json({
                    messages : 'چنین لایک ای یافت نشد',
                    success : false,
                })
            };
            const article = await Article.findById(like.article)

            let newLikeNumber = article.likeCount-1

            await Article.findByIdAndUpdate(like.article ,  {$set : {            
                likeCount : newLikeNumber
            }})

    
            await like.deleteOne()    
            

            return res.json({
                data : 'deleted',
                success : true
            })

        } catch (err) {
            console.log(err)
            res.json({
                data : this.apiError(404,  err),
                success : false
            })
            next();
        }
    }

}



module.exports = new likeController();