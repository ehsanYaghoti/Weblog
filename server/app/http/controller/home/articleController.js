const Controller = require('../controller');
const Article = require('app/models/article');
const Category = require('app/models/category');
const Tag = require('app/models/tag');
const User = require('app/models/user');



class articleController extends Controller {

    async someArticle(req , res , next){ 
        try {
        let title = new RegExp(req.query.name , 'gi')

        let query = req.query

        let sort = this.sortManager(query)

        const options = {
            page :  query.page || 1 ,
            limit : query.limit || 6 ,
            sort : sort ,
            select :  '-summary -images' ,
            populate : [
                {path : 'author' , select : '_id username avatar avatarpath'} , 
                {path : 'categories' , select : '_id name slug'} ,
                {path : 'tags' , select : '_id name slug'} ,
            ]
        }

        let createdAt =  this.timeMaker(req)

        let articles = await Article.paginate({createdAt : {"$gte" : createdAt }} , options)

        let aWeekAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
        const weekFavouriteArticles = await Article.find({createdAt : {"$gte" : aWeekAgo }}).select('-statement -summary -images').sort({likeCount : 'desc' }).limit(3)
        .populate({path : 'author' , select : '_id username avatar avatarpath'}) 
        .populate({path : 'categories' , select : '_id name slug'}) 

        let articlesByCategory = []
        if(req.query.category !== undefined && req.query.category !== null){
            await articles.docs.map(async article => {
                await article.categories.forEach(async category => {
                    if(category.slug === req.query.category){
                        articlesByCategory.push(article)
                        articles.totalPages = '1'
                        return  articles.docs = articlesByCategory
                    }
                })  
            })
        }
        

        const tags = await Tag.find({}).sort({followersCount : 'desc'}).limit(10)
        let userTags = []
        if(req.user){
            const user = await User.findById(req.user._id).populate({ path :'tags' , select : 'name slug'}).select('tags')
            userTags = user.tags
        }

        const categories = await Category.find({})

        if(articles.docs.length === 0){ 
            return res.json({ 
                message : ' مقاله جهت نمایش وجود ندارد' , 
                code : 204,
                success : false 
        })}
 
        this.checkUserLikdeAndSavedArticles(req , articles)
        this.checkUserFollowedTags(req , tags)

        return res.json({
            articles ,
            tags ,
            userTags,
            categories,
            weekFavouriteArticles,
            isAuthenticated : req.isAuthenticated(),
            user : req.user,            
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

    async singleArticle(req , res , next){ 
        try {

        // let title = new RegExp(req.query.name , 'gi')

        const article = await Article.findOne({slug : req.params.slug}).select('-summary -images')
        .populate({path : 'tags' , select : 'name slug'})
        .populate({path : 'categories' , select : 'name slug'})
        .populate({path : 'author' , select : 'username avatar avatarpath profossional fullname about followedByThisUser'})
        .populate({path : 'comments' , match : {parent : null} , options : {sort : {createdAt : 'desc'}} , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} }  , {path : 'comments' , populate : [{path : 'comments' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} }] } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} } , {path : 'user' , select : 'username avatar avatarpath' }] } ] })

        await Article.findOneAndUpdate({slug : req.params.slug} , {$set : {
            viewCount : article.viewCount +1
        }})


        let aWeekAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
        const weekFavouriteArticles = await Article.find({createdAt : {"$gte" : aWeekAgo }}).select('title slug author readingtime').sort({likeCount : 'desc' }).limit(3)
        .populate({path : 'author' , select : '_id username avatar avatarpath'}) 

        const recentArticles = await Article.find({}).select('title slug author readingtime').sort({createdAt : 'desc' }).limit(5)
        .populate({path : 'author' , select : '_id username avatar avatarpath'}) 

        const similarArticles = await Category.find({name : article.categories[0].name})
        .populate({path : 'articles' , select : 'title slug author thumb imagepath language readingtime saveCount likeCount likedByThisUser savedByThisUser commentCount createdAt' , limit : 3 , populate : [{path : 'author' , select : 'username avatar avatarpath'} , {path : 'categories' , select : 'name slug'}] }) 
        
        this.checkUserLikdeAndSavedArticles(req , similarArticles[0].articles , article)
        this.checkUserLikdedComments(req , article.comments)
        this.checkUserFollowedUsers(req , null , article.author)


        if(! article){ return res.json({ 
            message : ' مقاله جهت نمایش وجود ندارد' , 
            code : 204,
            success : false
        })}



        return res.json({
            article ,
            weekFavouriteArticles,
            recentArticles,
            similarArticles,
            isAuthenticated : req.isAuthenticated(),
            user : req.user,            
            success : true
        })
    } catch (err) {
        console.log(err)
        res.json({
            message :  err ,
            success : false
        })
        next();
      }
    }

}



module.exports = new articleController();