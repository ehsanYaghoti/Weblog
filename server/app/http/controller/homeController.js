const Controller = require('./controller')
const Comment = require('app/models/comment')

class HomeController extends Controller {
    index(req , res){

        res.json({
            message : 'Welcome To Api V 1'
        
        })
    }

    async comment(req , res , next){
        try {
            let result = await this.validationData(req)
            if(! result)  {
                res.json({
                    data : req.flash('validationMessage'),
                    success : false
                })
                // this.back(req , res)
                return 
            }
            
            const newComment = new Comment({
                // user : req.user._id,
                ...req.body
            })

            await newComment.save();

            return res.json({
                data : 'comment created',
                success : true
            })
            return this.back(req , res)
        } catch (err) {
            console.log(err)
            next(err)
        }   
    }
}



module.exports = new HomeController();