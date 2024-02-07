const Controller = require('./../controller')
const Tag = require('app/models/tag')
const User = require('app/models/user')


class tagController extends Controller {
    
    async allTags(req , res , next){
        try { 

            console.log(req.query)
            const feed = req.query.feed
            const search =  new RegExp(req.query.search , 'gi')
             

            let tags = []
            if(feed === 'true'){
                let user = await User.findById(req.user._id).select('tags')
                .populate({path : 'tags' , match : {name : search} , populate : [
                    {path : 'articlesCount'},
                    {path : 'podcastsCount'},
                    {path : 'postsCount'}
                ]})
                tags = user.tags
                console.log(tags)
            } else {
                tags = await Tag.paginate({name : search} , {
                    populate : 'articlesCount podcastsCount postsCount'
                })
            }

            
            this.checkUserFollowedTags(req , tags , null)


            return res.json({
                tags,
                user : req.user,
                isAuthenticated : req.isAuthenticated(),
                success : true
            })
            
        } catch (err) {
            console.log(err)
            res.json({
                messages : err ,
                code : 500,
                success : false
            })
            next()
        }
    }

    async singleTag(req , res , next){
        try {

            let query = req.query

            let sort = this.sortManager(query)
            let createdAt =  this.timeMaker(req)

            const slug = req.params.slug
            const type = req.query.type


            let tag ={}


            if(type === 'podcasts'){
                console.log(type)
                tag = await Tag.findOne({slug})
                .populate({path : 'podcasts' ,  select : '-images' , options : {sort : sort} , match : {createdAt : {"$gte" : createdAt }}  
                , populate : [{path : 'user' , select : 'username avatar avatarpath'},{path : 'categories' , select : 'name slug'}]
                })
                .populate({path : 'articlesCount' , select : '_id'})
                .populate({path : 'podcastsCount' , select : '_id'})
                .populate({path : 'postsCount' , select : '_id'})

                if(tag.podcasts.length === 0){ 
                    return res.status(204).json({ 
                        message : ' پادکست جهت نمایش وجود ندارد' , 
                        code : 204,
                        success : false
                    })
                }

                this.checkUserLikdeAndSavedPodcasts(req , tag.podcasts)

            } else if(type === 'posts'){
                tag = await Tag.findOne({slug})
                .populate({path : 'posts' ,  select : '-summary -images' , options : {sort : sort } , match : {createdAt : {"$gte" : createdAt }} 
                , populate : [{path : 'user' , select : 'username avatar avatarpath'},{path : 'tags' , select : 'name slug'}]
                })
                .populate({path : 'articlesCount' , select : '_id'})
                .populate({path : 'podcastsCount' , select : '_id'})
                .populate({path : 'postsCount' , select : '_id'})

                if(tag.posts.length === 0){ 
                    return res.json({ 
                        message : ' پست جهت نمایش وجود ندارد' , 
                        code : 204,
                        success : false
                })}

                this.checkUserSavedPosts(req , tag.posts)

            } 
            else {
                tag = await Tag.findOne({slug})
                .populate({path : 'articles' ,  select : '-summary -images' , options : {sort : sort , limit : req.query.limit || 10 , skip : req.query.skip  || 0 } , match : {createdAt : {"$gte" : createdAt }}
                    , populate : [{path : 'author' , select : 'username avatar avatarpath'},{path : 'categories' , select : 'name slug'}]
                })
                .populate({path : 'articlesCount' , select : '_id'})
                .populate({path : 'podcastsCount' , select : '_id'})
                .populate({path : 'postsCount' , select : '_id'})
                .populate({path : 'followers' , select : 'username'})

                // tag.articles = await Article.paginate({tags : slug})

                if(tag.articles.length === 0){ 
                    return res.json({ 
                        message : ' مقاله جهت نمایش وجود ندارد' , 
                        code : 204,
                        success : false
                })}

                this.checkUserLikdeAndSavedArticles(req , tag.articles)

            }

            this.checkUserFollowedTags(req , null , tag)

            return res.json({
                tag,
                user : req.user,
                isAuthenticated : req.isAuthenticated(),
                success : true
            })
            
        } catch (err) {
            console.log(err)
            res.json({
                messages : err ,
                code : 500,
                success : false
            })
            next()
        }
    }

    async followTag(req , res , next){
        try {

            const id = req.params.id

            await Tag.findByIdAndUpdate(id , {
                $push : {
                    followers : [req.user._id],
                } , 
                $inc : {
                    followersCount : 1
                } , 
                $set : {
                    followedByThisUser : true
                }
            })

            console.log(req.body)
            if(req.body.page === 'userDashboard'){
                const user = await User.findById(req.body.moredate)
                .populate({ path : 'tags' , populate : {path : 'articlesCount podcastsCount postsCount'} })

                return res.status(200).json({
                    tags : user.tags,
                    success : true
                })
            }

            const tag = await Tag.findById(id)

            const tags = await Tag.find({}).populate('articlesCount podcastsCount postsCount')
            // .populate({path : 'posts' ,  select : 'title'})
            // .populate({path : 'articles' ,  select : 'title'})
            // .populate({path : 'podcasts' ,  select : 'title'})


            return res.json({
                tag,
                tags,
                success : true
            })
            
        } catch (err) {
            console.log(err)
            res.json({
                messages : err ,
                code : 500,
                success : false
            })
            next()
        }
    }

    async unFollowTag(req , res , next){
        try {

            const id = req.params.id

            await Tag.findByIdAndUpdate(id , {
                $pull : {
                    followers : req.user._id,
                } , 
                $inc : {
                    followersCount : -1
                } , 
                $set : {
                    followedByThisUser : false
                }
            })

            const tag = await Tag.findById(id)
        

            const tags = await Tag.find({}).populate('articlesCount podcastsCount postsCount')
            // .populate({path : 'posts' ,  select : 'title'})
            // .populate({path : 'articles' ,  select : 'title'})
            // .populate({path : 'podcasts' ,  select : 'title'})

            console.log(req.body)
            if(req.body.page === 'userDashboard'){
                const user = await User.findById(req.body.moredate)
                .populate({ path : 'tags' , populate : {path : 'articlesCount podcastsCount postsCount'} })

                return res.status(200).json({
                    tags : user.tags,
                    success : true
                })
            }



            return res.json({
                tag,
                tags,
                success : true
            })
            
        } catch (err) {
            console.log(err)
            res.json({
                messages : err ,
                code : 500,
                success : false
            })
            next()
        }
    }
}

module.exports = new tagController();