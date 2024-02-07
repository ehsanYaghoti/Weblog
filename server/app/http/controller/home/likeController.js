const Controller = require('../controller')
const Like = require('app/models/like');
const Article = require('app/models/article');
const Podcast = require('app/models/podcast');
const Comment = require('app/models/comment');

class likeController extends Controller {

    async likeProcess(req , res , next){
        try{
            const kind = req.body.kind

            switch (kind) {
                case 'article':
                    return this.createArticleLike(req , res , next)
                break;
                case 'podcast':             
                    return this.createPodcastLike(req , res , next)
                break;
                case 'comment':
                    this.createCommentLike(req , res , next)
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

    async disLikeProcess(req , res , next){
        try{
            const kind = req.params.kind

            switch (kind) {
                case 'article':
                    this.deleteArticleLike(req , res , next)
                break;
                case 'podcast':
                    this.deletePodcastLike(req , res , next)
                break;
                case 'comment':
                    this.deleteCommentLike(req , res , next)
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

    async createArticleLike(req ,res , next) {
        try {
            const id = req.body.id

            let article = await Article.findById(id)    
            
            const newLike = await new Like({
                user : req.user.id,
                article : id
            })    

            newLike.save()

            let newLikeNumber = article.likeCount+1

            await Article.findByIdAndUpdate(id ,  {$set : {            
                likeCount : newLikeNumber,
                likedByThisUser : true
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

    async deleteArticleLike(req ,res , next) {
        try {
            const id = req.params.id

            this.isMongoId(id)

            let article = await Article.findById(id)

            const like = await Like.findOne({article : id})

            if(! like){ 
                return res.json({
                    messages : 'چنین لایک ای یافت نشد',
                    success : false,
                })
            };

            await like.deleteOne()    

            let newLikeNumber = article.likeCount-1

            await Article.findByIdAndUpdate(id ,  {$set : {            
                likeCount : newLikeNumber,
                likedByThisUser : false
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

    async createPodcastLike(req ,res , next) {
        try {
            const id = req.body.id

            const podcast = await Podcast.findById(id)    
            
            const newLike = await new Like({
                user : req.user.id,
                podcast : id
            })    

            newLike.save()

            let newLikeNumber = podcast.likeCount+1

            await Podcast.findByIdAndUpdate(id ,  {$set : {            
                likeCount : newLikeNumber,
                likedByThisUser : true
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

    async deletePodcastLike(req ,res , next) {
        try {
            const id = req.params.id

            this.isMongoId(id)

            const podcast = await Podcast.findById(id)

            const like = await Like.findOne({podcast : id})

            if(! like){ 
                return res.json({
                    messages : 'چنین لایک ای یافت نشد',
                    success : false,
                })
            };

            await like.deleteOne()    

            let newLikeNumber = podcast.likeCount-1

            await Podcast.findByIdAndUpdate(id ,  {$set : {            
                likeCount : newLikeNumber,
                likedByThisUser : false
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
    
    async createCommentLike(req ,res , next) {
        try {
            const id = req.body.id

            const comment = await Comment.findById(id)    
            
            const newLike = await new Like({
                user : req.user.id,
                comment : id
            })    

            newLike.save()

            let newLikeNumber = comment.likeCount+1

            await Comment.findByIdAndUpdate(id ,  {$set : {            
                likeCount : newLikeNumber,
                likedByThisUser : true
            }})

            let comments = []

            if(comment.article !== null){
                comments = await Comment.find({article : comment.article , parent : null}).sort({createdAt : 'desc'}).populate([{path : 'user' , select : 'username avatar avatarpath' } , {path : 'comments' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} }  , {path : 'comments' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} }  ] }] } ])
            } else if(comment.podcast !== null){
                comments = await Comment.find({podcast : comment.podcast , parent : null}).sort({createdAt : 'desc'}).populate([{path : 'user' , select : 'username avatar avatarpath' } , {path : 'comments' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} }  , {path : 'comments' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} }  ] }] } ])
            }

            return res.json({
                data : 'updated',
                comments,
                comment,
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

    async deleteCommentLike(req ,res , next) {
        try {
            const id = req.params.id

            this.isMongoId(id)

            const comment = await Comment.findById(id)

            const like = await Like.findOne({comment : id})

            if(! like){ 
                return res.json({
                    messages : 'چنین لایک ای یافت نشد',
                    success : false,
                })
            };

            await like.deleteOne()    

            let newLikeNumber = comment.likeCount-1

            await Comment.findByIdAndUpdate(id ,  {$set : {            
                likeCount : newLikeNumber,
                likedByThisUser : false
            }})

            let comments = []

            if(comment.article !== null){
                comments = await Comment.find({article : comment.article , parent : null}).sort({createdAt : 'desc'}).populate([{path : 'user' , select : 'username avatar avatarpath' } , {path : 'comments' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} } , {path : 'comments' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} }] }] } ])
            } else if(comment.podcast !== null){
                comments = await Comment.find({podcast : comment.podcast , parent : null}).sort({createdAt : 'desc'}).populate([{path : 'user' , select : 'username avatar avatarpath' } , {path : 'comments' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} } , {path : 'comments' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} }] }] } ])
            }

            return res.json({
                data : 'updated',
                comments,
                comment,
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

module.exports = new likeController();