const Controller = require('../controller')
const Article = require('app/models/article');
const Podcast = require('app/models/podcast');
const Post = require('app/models/post');



class searchController extends Controller {
    async search(req , res , next){
        try {

            let search = new RegExp(req.params.search , 'gi')
            let query = req.query

            let articles = {docs : []}
            let podcasts = {docs : []}
            let posts = {docs : []}

            console.log(query)

            if(req.query.type === 'podcasts'){
                podcasts = await Podcast.paginate({title : search } ,  {
                    page :  query.page || 1 ,
                    limit : query.limit || 6 ,
                    sort : {createdat : 'desc'},
                    select : '-summary -statement -images',
                    populate : [
                        {path : 'user' , select : '_id username avatar avatarpath'} , 
                        {path : 'categories' , select : '_id name slug'} ,
                        {path : 'tags' , select : '_id name slug'} ,
                    ]
                })

                this.checkUserLikdeAndSavedPodcasts(req , podcasts , null)

            } else if(req.query.type === 'posts'){
                posts = await Post.paginate({title : search } ,  {
                    page :  query.page || 1 ,
                    limit : query.limit || 6 ,
                    sort : {createdat : 'desc'},
                    select : '-images',
                    populate : [
                        {path : 'user' , select : '_id username avatar avatarpath'} , 
                        {path : 'tags' , select : '_id name slug'} ,
                    ]
                })

                this.checkUserSavedPosts(req , posts , null)

            } else{
                articles = await Article.paginate({title : search } , {
                    page :  query.page || 1 ,
                    limit : query.limit || 10 ,
                    sort : {createdat : 'desc'},
                    select : '-summary -statement -images',
                    populate : [
                        {path : 'author' , select : '_id username avatar avatarpath'} , 
                        {path : 'categories' , select : '_id name slug'} ,
                        {path : 'tags' , select : '_id name slug'} ,
                    ]
                })

                this.checkUserLikdeAndSavedArticles(req , articles , null)

            } 

            const articlesCount = await Article.countDocuments({title : search});
            const podcastsCount = await Podcast.countDocuments({title : search});
            const postsCount = await Post.countDocuments({title : search});

            
            // if(articles.docs.length === 0 && podcasts.docs.length === 0 && posts.docs.length === 0 ){
            //     return res.status(204).json({
            //         messages : 'there is no info',
            //         success :false
            //     })
            // }
            
            return res.status(200).json({
                articles,
                podcasts,
                posts,
                articlesCount,
                podcastsCount,
                postsCount,
                isAuthenticated : req.isAuthenticated(),
                user : req.user,
                success :true
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message : error,
                success : false
            })
            return next()
        }
    }
}

module.exports =  new searchController();