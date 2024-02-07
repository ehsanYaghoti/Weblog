const Controller = require('../controller');
const Article = require('app/models/article');
const Podcast = require('app/models/podcast');
const Comment = require('app/models/comment');


class commentController extends Controller {

    async index(req , res , next){ 
        try {
        // console.log(req.query)

        const options = {
            page :  req.query.page || 1 ,
            limit : req.query.limit || 10 ,
            sort : { title : req.query.sortComment } ,
            select :  '_id user comments parent statement book article belongsTo approved' ,
            populate : ['comments' , 
                { path : 'user' , select : '_id username avatar avatarpath'},
                { path : 'belongsTo' , select : '_id title'},
                { path : 'parent' , select : '_id user statement' , 
                    populate : {path : 'user' , select : '_id username'}
                },
            ]
        }

        let title = new RegExp(req.query.name , 'g')

        
        let comments = await Comment.paginate({} , options)

        // console.log(books)
        if(comments.docs.length === 0){ return res.json({ data : ' کامنت جهت نمایش وجود ندارد' , 
            success : false
        })}


        return res.json({
            data :  comments ,
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

    async approve(req , res , next){
        try {


            
        } catch (err) {
            console.log(err);
            res.json({
                data : 'err in server',
                success : false
            })
            next();
        }
    }

    async create(req , res) {
        try {

            // const result =  this.validationData(req , res)

            // if(! result){
            //     return res.json({
            //         success : result ,
            //         messages : req.flash('validationMessage'),
            //     })
            // }
                

        if(req.body.articleId){
            const {
                articleId ,
                statement ,
                parent,
            } = req.body
    
            const newComment = await new Comment({
                user : req.user._id,
                article : articleId ,
                parent ,
                statement ,
                approved : true,
                media : articleId,
                mediaModel : 'Article'
            })
    
            await newComment.save();
    
            let article = await Article.findById(articleId)    
    
            let newCommentsNumber = article.commentCount+1
    
            await Article.findByIdAndUpdate(articleId ,  {$set : {            
                commentCount : newCommentsNumber,
            }})
    
    
            const articleComments = await Comment.find({article : article , parent : null}).sort({createdAt : 'desc'})
            .populate([{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} } , {path : 'comments' , populate : [{path : 'comments' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} } ] } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} } , {path : 'user' , select : 'username avatar avatarpath' }] } ])
            // , match : {article : {$ne: null}}
    
            return res.json({
                data : newComment,
                articleComments,
                newCommentsNumber,
                success : true
            })
        } else if(req.body.podcastId){
            console.log(req.body)

            const {
                podcastId ,
                statement ,
                parent,
            } = req.body
    
            const newComment = await new Comment({
                user : req.user._id,
                podcast : podcastId ,
                parent ,
                statement ,
                approved : true,
                media : podcastId,
                mediaModel : 'Podcast',
            })    
    
            await newComment.save();
    
            let podcast = await Podcast.findById(podcastId)    

            console.log(podcast)
    
            let newCommentsNumber = podcast.commentCount+1
    
            await Podcast.findByIdAndUpdate(podcastId ,  {$set : {            
                commentCount : newCommentsNumber,
            }})
    
    
            const podcastComments = await Comment.find({podcast : podcast , parent : null}).sort({createdAt : 'desc'})
            .populate([{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} } , {path : 'comments' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} } , {path : 'comments' , populate : [{path : 'user'  , select : 'username avatar avatarpath'} , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} } ] }] } ])
            // , match : {podcast : {$ne: null}}
    
            return res.json({
                data : newComment,
                podcastComments,
                newCommentsNumber,
                success : true
            })
        }

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                messages : err,
                success : false
            })
        }
    }

    async update(req , res , next){
        try {
            this.isMongoId(req.params.id)
            const comment = await Comment.findById(req.params.id)
            if(! comment){ this.error(404 , 'چنین کامنت ای یافت نشد')};
            // console.log(comment)

            const approveState = comment.approved
            // console.log(approveState)

            comment.approved = !approveState
                
        
            await comment.save();

            const options = {
                page :  req.query.page || 1 ,
                limit : req.query.limit || 10 ,
                sort : { title : req.query.sortComment } ,
                select :  '_id user comments parent statement book article belongsTo approved' ,
                populate : ['comments' , 
                    { path : 'user' , select : '_id username'},
                    { path : 'belongsTo' , select : '_id title'},
                    { path : 'parent' , select : '_id user statement' , 
                        populate : {path : 'user' , select : '_id username'}
                    },
                ]
            }
    
            let title = new RegExp(req.query.name , 'g')
    
            
            let comments = await Comment.paginate({} , options)
    
            // console.log(books)
            if(comments.docs.length === 0){ return res.json({ data : ' کامنت جهت نمایش وجود ندارد' , 
                success : false
            })}

            
            return res.json({
                data : comments ,
                success : true
            });
        } catch (err) {
            console.log(err)
            res.json({
                data : 'err',
                success : false
            })
            next();
        }
    }

    async delete(req , res , next) {
        try {
            this.isMongoId(req.params.id)
            const comment = await Comment.findById(req.params.id)
            // return res.json(category.childrens)
            if(! comment){ this.error(404 , 'چنین کامنت ای یافت نشد')};
    
            await comment.deleteOne()    
            

            return res.json({
                data : 'deleted',
                success : true
            })

        } catch (err) {
            res.json({
                data : this.error(404,  err),
                success : false
            })
            next();
        }
    }

}



module.exports = new commentController();