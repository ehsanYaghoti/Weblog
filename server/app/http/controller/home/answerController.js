const Controller = require('../controller');
const Post = require('app/models/post');
const Answer = require('app/models/answer');
const User = require('app/models/user');
const Report = require('app/models/report');




class answerController extends Controller {

    async index(req , res , next){ 
        try {
        // console.log(req.query)

        const options = {
            page :  req.query.page || 1 ,
            limit : req.query.limit || 10 ,
            sort : { title : req.query.sortAnswer } ,
            select :  '_id user answers parent statement  post belongsTo approved' ,
            populate : ['answers' , 
                { path : 'user' , select : '_id username'},
                { path : 'parent' , select : '_id user statement' , 
                    populate : {path : 'user' , select : '_id username'}
                },
            ]
        }

        let title = new RegExp(req.query.name , 'g')

        
        let answers = await Answer.paginate({} , options)

        // console.log(books)
        if(answers.docs.length === 0){ return res.json({ data : ' کامنت جهت نمایش وجود ندارد' , 
            success : false
        })}


        return res.json({
            data :  answers ,
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
                
            console.log(req.body)

        // if(req.body.answerId){
            const {
                postId ,
                statement ,
                parent,
            } = req.body
    
            const newAnswer = await new Answer({
                user : req.user._id,
                post : postId ,
                parent ,
                statement ,
                approved : true,
            })
    
    
            await newAnswer.save();
    
            let post = await Post.findById(postId)    
    
            let newAnswersNumber = post.answerCount+1
    
            await Post.findByIdAndUpdate(postId ,  {$set : {            
                answerCount : newAnswersNumber,
            }})
    
    
            const postAnswers = await Answer.find({post : post , parent : null}).sort({createdAt : 'desc'})
            .populate([{path : 'user' , select : 'username avatar avatarpath profossional' } , {path : 'answers' , populate : [{path : 'user' , select : 'username avatar avatarpath profossional'} , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} } ,{path : 'answers' , populate : [{path : 'user' , select : 'username avatar avatarpath profossional'} , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} } ]}] } ])
            // , match : {post : {$ne: null}}

            console.log(postAnswers)
    
            return res.json({
                data : newAnswer,
                postAnswers,
                newAnswersNumber,
                success : true
            })
        // } 
        

        } catch (err) {
            console.log(err)
            return res.json({
                messages : err,
                success : false
            })
        }
    }

    async report(req , res , next){ 
        try {
            
            let reports = req.body.reports
            let answerId = req.body.answerId

            
            console.log(req.body)
            let answer = await Answer.findById(answerId).select('title user reports reported')
            
            let user = await User.findByIdAndUpdate(req.user._id , {
                reports : reports
            })

            if(Array.isArray(reports)){
                 reports.forEach(async report => {
                    await Report.findByIdAndUpdate(report , {$set : {
                        answers : [answerId],
                        users : [user._id],
                        authors : [answer.user]
                    }})
                }) 
                
            }

            await Answer.findByIdAndUpdate(req.body.answerId , { $set : {
                reports : [
                    ...answer.reports,
                    ...reports,
                ],
                reported : true
            }})
            // console.log(answer)
            // console.log(user)

            

        return res.json({
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

    async update(req , res , next){
        try {
            this.isMongoId(req.params.id)
            const answer = await Answer.findById(req.params.id)
            if(! answer){ this.error(404 , 'چنین کامنت ای یافت نشد')};
            // console.log(answer)

            const approveState = answer.approved
            // console.log(approveState)

            answer.approved = !approveState
                
        
            await answer.save();

            const options = {
                page :  req.query.page || 1 ,
                limit : req.query.limit || 10 ,
                sort : { title : req.query.sortAnswer } ,
                select :  '_id user answers parent statement book post belongsTo approved' ,
                populate : ['answers' , 
                    { path : 'user' , select : '_id username'},
                    { path : 'belongsTo' , select : '_id title'},
                    { path : 'parent' , select : '_id user statement' , 
                        populate : {path : 'user' , select : '_id username'}
                    },
                ]
            }
    
            let title = new RegExp(req.query.name , 'g')
    
            
            let answers = await Answer.paginate({} , options)
    
            // console.log(books)
            if(answers.docs.length === 0){ return res.json({ data : ' کامنت جهت نمایش وجود ندارد' , 
                success : false
            })}

            
            return res.json({
                data : answers ,
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
            const answer = await Answer.findById(req.params.id)
            // return res.json(category.childrens)
            if(! answer){ this.error(404 , 'چنین کامنت ای یافت نشد')};
    
            await answer.deleteOne()    
            

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



module.exports = new answerController();