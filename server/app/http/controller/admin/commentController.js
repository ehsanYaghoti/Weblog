const Controller = require('../controller');
const Category = require('app/models/category');
const Comment = require('app/models/comment');


class commentController extends Controller {

    async index(req , res , next){ 
        try {
        // console.log(req.query)

        const options = {
            page :  req.query.page || 1 ,
            limit : req.query.limit || 10 ,
            sort : { title : req.query.sortComment } ,
            select :  '_id user comments parent statement podcast article approved' ,
            populate : ['comments' , 
                { path : 'user' , select : '_id username'},
                { path : 'article' , select : '_id title slug'},
                { path : 'podcast' , select : '_id title slug'},
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