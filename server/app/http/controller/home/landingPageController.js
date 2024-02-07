const Controller = require('./../controller')
const Article = require('app/models/article');
const Podcast = require('app/models/podcast');
const Post = require('app/models/post');
const Category = require('app/models/category');
const Tag = require('app/models/tag');
const User = require('app/models/user');
const Like = require('app/models/like');



class landingPgeController extends Controller {
    async index(req ,res , next) {
        try {

            const articles = await Article.find({}).select('-statement -summary -images').sort({createdAt : 'desc'}).limit(9)
            .populate({path : 'author' , select : '_id username avatar avatarpath likes' })
            .populate({path : 'categories' , select : '_id name slug' })
            .populate({path : 'tags' , select : '_id name slug' })
            .populate({path : 'likes'}).exec()

            const podcasts = await Podcast.find({}).sort({createdAt : 'desc'}).limit(9)
            .populate({path : 'user' , select : '_id username avatar avatarpath likes' })
            .populate({path : 'categories' , select : '_id name slug' })
            .populate({path : 'tags' , select : '_id name slug' })
            .populate({path : 'likes'}).exec()

            const posts = await Post.find({}).sort({createdAt : 'desc'}).limit(6)
            .populate({path : 'user' , select : '_id username avatar avatarpath likes' })
            .populate({path : 'tags' , select : '_id name slug' })

            const categories = await Category.find({})
            const tags = await Tag.find({}).sort({followersCount : 'desc'}).limit(6)

            let user = {}

            if(req.isAuthenticated()){
                user = await User.findById(req.user.id).populate({path : 'likes saves'}).exec()

                let userLikedArticles = []
                userLikedArticles = user.likes.map(like => {
                    if(like.article){
                        return like.article.toString()
                    }
                    return ''
                })

                let userSavedArticles = []
                userSavedArticles = user.saves.map(save => {
                    if(save.article){
                        return save.article.toString()
                    }
                    return ''
                })
    
                articles.forEach(async article => {
                    let articleId = article._id.toString()

                    if(userLikedArticles.includes(articleId)){
                        await article.updateOne({
                            likedByThisUser : true
                        })
                    } else{
                        await article.updateOne({
                            likedByThisUser : false
                        })
                    }

                    if(userSavedArticles.includes(articleId)){
                        await article.updateOne({
                            savedByThisUser : true
                        })
                    } else{
                        await article.updateOne({
                            savedByThisUser : false
                        })
                    }


                })
            }

            if(req.isAuthenticated()){
                user = await User.findById(req.user.id).populate({path : 'likes saves'}).exec()

                let userLikedPodcasts = []
                userLikedPodcasts = user.likes.map(like => {
                    if(like.podcast){
                        return like.podcast.toString()
                    }
                    return ''
                })

                let userSavedPodcasts = []
                userSavedPodcasts = user.saves.map(save => {
                    if(save.podcast){
                        return save.podcast.toString()
                    }
                    return ''
                })
    

                podcasts.forEach(async podcast => {
                    let podcastId = podcast._id.toString()

                    if(userLikedPodcasts.includes(podcastId)){
                        await podcast.updateOne({
                            likedByThisUser : true
                        })
                    } else{
                        await podcast.updateOne({
                            likedByThisUser : false
                        })
                    }

                    if(userSavedPodcasts.includes(podcastId)){
                        await podcast.updateOne({
                            savedByThisUser : true
                        })
                    } else{
                        await podcast.updateOne({
                            savedByThisUser : false
                        })
                    }


                })
            }
            
            return res.json({
                articles,
                podcasts,
                posts,
                categories ,
                tags ,
                isAuthenticated : req.isAuthenticated(),
                user,
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


module.exports = new landingPgeController();