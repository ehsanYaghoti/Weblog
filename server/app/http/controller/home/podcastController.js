const Controller = require('../controller');
const Podcast = require('app/models/podcast');
const Category = require('app/models/category');
const Tag = require('app/models/tag');


class podcastController extends Controller {

    async somePodcast(req , res , next){ 
        try {

        let query = req.query

        let sort = this.sortManager(query)

        const options = {
            page :  query.page || 1 ,
            limit : query.limit || 6 ,
            sort : sort ,
            select :  '-statement -summary -images' ,
            populate : [
                {path : 'user' , select : '_id username avatar avatarpath'} , 
                {path : 'categories' , select : '_id name slug'} ,
                {path : 'tags' , select : '_id name slug'} ,
            ]
        }

        let createdAt =  this.timeMaker(req)

        let podcasts = await Podcast.paginate({createdAt : {"$gte" : createdAt }} , options)

        let aWeekAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
        const weekFavouritePodcasts = await Podcast.find({createdAt : {"$gte" : aWeekAgo }}).select('-statement -summary -images').sort({likeCount : 'desc' }).limit(3)
        .populate({path : 'user' , select : '_id username avatar avatarpath'}) 
        .populate({path : 'categories' , select : '_id name slug'}) 


        let podcastsByCategory = []
        // console.log(req.query)
        if(req.query.category !== undefined && req.query.category !== null){
            // console.log(req.query.category)
            podcasts.docs.map(podcast => {
                podcast.categories.forEach(category => {
                    if(category.slug === req.query.category){
                        // console.log(podcast.title)
                        podcastsByCategory.push(podcast)
                        podcasts.totalPages = '1'
                        return  podcasts.docs = podcastsByCategory
                    }
                })  
            })
            // console.log(articles.docs)

        }



        const tags = await Tag.find({}).sort({followersCount : 'desc'}).limit(10)

        if(podcasts.docs.length === 0){ 
            return res.json({ 
                message : ' پادکست جهت نمایش وجود ندارد' , 
                code : 204,
                success : false
        })}

        this.checkUserFollowedTags(req , tags)
        this.checkUserLikdeAndSavedPodcasts(req , podcasts)

        return res.json({
            podcasts ,
            tags ,
            isAuthenticated : req.isAuthenticated(),
            weekFavouritePodcasts,
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

    async singlePodcast(req , res , next){ 
        try {
        // console.log(req.params.slug)

        const podcast = await Podcast.findOne({slug : req.params.slug}).select('-images')
        .populate({path : 'tags' , select : 'name slug'})
        .populate({path : 'categories' , select : 'name slug'})
        .populate({path : 'user' , select : 'username avatar avatarpath profossional fullname about followedByThisUser'})
        .populate({path : 'comments' , match : {parent : null} , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} }  , {path : 'comments' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} } , {path : 'comments' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} } ] } ] } ] })

        await Podcast.findOneAndUpdate({slug : req.params.slug} , {$set : {
            viewCount : podcast.viewCount +1 
        }})

        const similarPodcasts = await Tag.find({name : podcast.tags[0].name })
        .populate({path : 'podcasts' , select : 'title slug user thumb imagepath soundTime language saveCount likeCount likedByThisUser savedByThisUser commentCount createdAt' , limit : 2 , populate : [{path : 'user' , select : 'username avatar avatarpath'} , {path : 'tags categories' , select : 'name slug'}] }) 
        
        this.checkUserLikdeAndSavedPodcasts(req , similarPodcasts[0].podcasts , podcast)
        this.checkUserLikdedComments(req , podcast.comments)
        this.checkUserFollowedUsers(req , null , podcast.user)

        // console.log(similarPodcasts)

        if(! podcast){ return res.json({ 
            message : ' پادکست جهت نمایش وجود ندارد' , 
            code : 204,
            success : false
        })}



        return res.json({
            podcast ,
            similarPodcasts,
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



module.exports = new podcastController();