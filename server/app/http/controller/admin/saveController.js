const Controller = require('../controller');
const Save = require('app/models/save');
const Article = require('app/models/article');
const Podcast = require('app/models/podcast');
const Post = require('app/models/post');






class saveController extends Controller {

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
            {path : 'article' , select : '_id title slug saveCount'} ,
            {path : 'podcast' , select : '_id title slug saveCount'} ,
            {path : 'post' , select : '_id title slug saveCount'} ,

            ]

        }
 

        
        let saves = await Save.paginate({} , options)

        // console.log(saves)
        if(saves.docs.length === 0){ return res.json({ 
            data : ' ذخیره جهت نمایش وجود ندارد' , 
            success : false
        })}

        // console.log(saves)


        return res.json({
            data :  saves ,
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
            const save = await Save.findById(req.params.id)

            if(! save){ 
                return res.json({
                    messages : 'چنین ذخیره ای یافت نشد',
                    success : false,
                })
            };

     
            console.log(save)
            console.log(save.article)
            if(save.article !== null ){
                await Article.findByIdAndUpdate(save.article ,  {$inc : {            
                    saveCount : -1
                }})
            } else if(save.podcast !== null ){
                await Podcast.findByIdAndUpdate(save.podcast ,  {$inc : {            
                    saveCount : -1
                }})
            } else if(save.post !== null ){
                await Post.findByIdAndUpdate(save.post ,  {$inc : {            
                    saveCount : -1
                }})
            }


            await save.deleteOne()    
    
            

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



module.exports = new saveController();