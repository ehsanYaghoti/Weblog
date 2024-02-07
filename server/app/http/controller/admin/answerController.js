const Controller = require('../controller');
const Answer = require('app/models/answer');


class answerController extends Controller {

    async index(req , res , next){ 
        try {
        // console.log(req.query)

        const options = {
            page :  req.query.page || 1 ,
            limit : req.query.limit || 10 ,
            sort : { title : req.query.sortAnswer } ,
            select :  '_id user answers parent statement post tags reported reports' ,
            populate : [
                { path : 'reports' , select : 'title'},
                { path : 'post' , select : 'title slug'},
                { path : 'answers' , select : '_id'},
                { path : 'user' , select : '_id username'},
                { path : 'parent' , select : '_id user statement' , 
                    populate : {path : 'user' , select : '_id username'}
                },
            ]
        }

        let title = new RegExp(req.query.name , 'gi')

        
        let answers = await Answer.paginate({} , options)

        console.log(answers)
        if(answers.docs.length === 0){ 
            return res.json({
                messages : 'پاسخ جهت نمایش وجود ندارد' , 
                success : false
            })
        }


        return res.json({
            data :  answers ,
            authenticatedUser : req.user ,
            isAuthenticated : req.isAuthenticated() ,
            success : true
        })
    } catch (err) {
        console.log(err)
        res.json({
            messages :  err ,
            success : false
        })
        next();
    }


    }

    async approve(req , res , next){
        try {

            const answer = await Answer.findById({id : req.query.id})

            
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
            const answer = await Answer.findById(req.params.id)
            if(! answer){ this.error(404 , 'چنین پاسخ ای یافت نشد')};
            // console.log(answer)

            const approveState = answer.approved
            // console.log(approveState)

            answer.approved = !approveState
                
        
            await answer.save();

            const options = {
                page :  req.query.page || 1 ,
                limit : req.query.limit || 10 ,
                sort : { title : req.query.sortAnswer } ,
                select :  '_id user answers parent content book article belongsTo approved' ,
                populate : ['answers' , 
                    { path : 'user' , select : '_id username'},
                    { path : 'parent' , select : '_id user content' , 
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
            if(! answer){ this.error(404 , 'چنین پاسخ ای یافت نشد')};
    
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