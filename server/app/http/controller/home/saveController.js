const Controller = require('../controller')
const Save = require('app/models/save');
const Article = require('app/models/article');
const Podcast = require('app/models/podcast');
const Post = require('app/models/post');

class saveController extends Controller {

    async saveProcess(req , res , next){
        try{
            const kind = req.body.kind
            switch (kind) {
                case 'article':
                    return this.createArticleSave(req , res , next)
                break;
                case 'podcast':
                    return  this.createPodcastSave(req , res , next)
                break;
                case 'post':
                    return this.createPostSave(req , res , next)
                break;
                default:
                break;
            }

        } catch (error) {
            console.log(error)
            return res.json({
                data :  `${error}` ,
                success : false
            })
        }
    }

    async unSaveProcess(req , res , next){
        try{
            const kind = req.params.kind
            switch (kind) {
                case 'article':
                    return this.deleteArticleSave(req , res , next)
                break;
                case 'podcast':
                    return this.deletePodcastSave(req , res , next)
                break;
                case 'post':
                    return this.deletePostSave(req , res , next)
                break;
                default:
                break;
            }

        } catch (error) {
            console.log(error)
            return res.json({
                data :  `${error}` ,
                success : false
            })
        }
    }

    async createArticleSave(req ,res , next) {
        try {
            const id = req.body.id

            let article = await Article.findById(id)    
            
            const newSave = await new Save({
                user : req.user.id,
                article : id
            })    

            newSave.save()

            let newSaveNumber = article.saveCount+1

            await Article.findByIdAndUpdate(id ,  {$set : {            
                saveCount : newSaveNumber,
                savedByThisUser : true
            }})

            return res.json({
                data : 'updated',
                article,
                success : true
            })

        } catch (error) {
            console.log(error)
            return res.json({
                data :  `${error}` ,
                success : false
            })
        }
    }

    async deleteArticleSave(req ,res , next) {
        try {
            const id = req.params.id

            this.isMongoId(id)

            let article = await Article.findById(id)

            const save = await Save.findOne({article : id})

            if(! save){ 
                return res.json({
                    messages : 'چنین ذخیره ای یافت نشد',
                    success : false,
                })
            };

            await save.deleteOne()

            let newSaveNumber = article.saveCount-1

            article = await Article.findByIdAndUpdate(id ,  {$set : {            
                saveCount : newSaveNumber,
                savedByThisUser : false
            }})

            return res.json({
                data : 'updated',
                article,
                success : true
            })


        } catch (error) {
            console.log(error)
            return res.json({
                data :  `${error}` ,
                success : false
            })
        }
    }

    async createPodcastSave(req ,res , next) {
        try {
            const id = req.body.id

            const podcast = await Podcast.findById(id)    
            
            const newSave = await new Save({
                user : req.user.id,
                podcast : id
            })    

            newSave.save()

            let newSaveNumber = podcast.saveCount+1

            await Podcast.findByIdAndUpdate(id ,  {$set : {            
                saveCount : newSaveNumber,
                savedByThisUser : true
            }})

            return res.json({
                data : 'updated',
                podcast,
                success : true
            })


        } catch (error) {
            console.log(error)
            return res.json({
                data :  `${error}` ,
                success : false
            })
        }
    }

    async deletePodcastSave(req ,res , next) {
        try {
            const id = req.params.id

            this.isMongoId(id)

            const podcast = await Podcast.findById(id)

            const save = await Save.findOne({podcast : id})

            if(! save){ 
                return res.json({
                    messages : 'چنین ذخیره ای یافت نشد',
                    success : false,
                })
            };

            await save.deleteOne()    

            let newSaveNumber = podcast.saveCount-1

            await Podcast.findByIdAndUpdate(id ,  {$set : {            
                saveCount : newSaveNumber,
                savedByThisUser : false
            }})

            return res.json({
                data : 'updated',
                podcast,
                success : true
            })


        } catch (error) {
            console.log(error)
            return res.json({
                data :  `${error}` ,
                success : false
            })
        }
    }
    
    async createPostSave(req ,res , next) {
        try {
            const id = req.body.id

            const post = await Post.findById(id)    
            
            const newSave = await new Save({
                user : req.user.id,
                post : id
            })    

            newSave.save()

            let newSaveNumber = post.saveCount+1

            await Post.findByIdAndUpdate(id ,  {$set : {            
                saveCount : newSaveNumber,
                savedByThisUser : true
            }})

            return res.json({
                data : 'updated',
                post,
                success : true
            })

        } catch (error) {
            console.log(error)
            return res.json({
                data :  `${error}` ,
                success : false
            })
        }
    }

    async deletePostSave(req ,res , next) {
        try {
            const id = req.params.id

            this.isMongoId(id)

            const post = await Post.findById(id)

            const save = await Save.findOne({post : id})

            if(! save){ 
                return res.json({
                    messages : 'چنین ذخیره ای یافت نشد',
                    success : false,
                })
            };

            await save.deleteOne()    

            let newSaveNumber = post.saveCount-1

            await Post.findByIdAndUpdate(id ,  {$set : {            
                saveCount : newSaveNumber,
                savedByThisUser : false
            }})

            return res.json({
                data : 'updated',
                post,
                success : true
            })

        } catch (error) {
            console.log(error)
            return res.json({
                data :  `${error}` ,
                success : false
            })
        }
    }

}

module.exports = new saveController();