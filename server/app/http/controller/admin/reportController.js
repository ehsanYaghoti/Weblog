const Controller = require('../controller');
const Report = require('app/models/report');


class reportController extends Controller {

    async index(req , res , next){ 
        try {
        // console.log(req.query)

        const options = {
            page :  req.query.page || 1 ,
            limit : req.query.limit || 10 ,
            sort : { title : req.query.sortReportName } ,
            select :  'title user users posts answers authors' ,
            populate : [
                {path : 'users' , select : '_id username'} ,
                {path : 'authors' , select : '_id username'} ,
                {path : 'posts' , select : '_id title'} ,
                {path : 'answers' , select : '_id title'} ,
                {path : 'user' , select : '_id username'} ,
            ]

        }


        
        let reports = await Report.paginate({} , options)

        if(reports.docs.length === 0){ return res.json({ 
            messages : ' گزارش جهت نمایش وجود ندارد' , 
            success : false
        })}

        // console.log(reports)


        return res.json({
            data :  reports ,
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

    async create(req , res) {
        try {

            const result =  this.validationData(req , res)
            if(! result){
                return res.json({
                    success : result ,
                    messages : req.flash('validationMessage'),
                })
            }
                
            const {
                title ,
            } = req.body

            // console.log(req.body)
            const newReport = await new Report({
                title,
                slug : this.slug(title) ,
                user : req.user._id
            })

            await newReport.save();

            return res.json({
                data : newReport,
                success : true
            })

        } catch (err) {
            console.log(err)
            return res.json({
                messages : err,
                success : false
            })
        }
    }

    async updateForm (req , res , next) {
        try {

        this.isMongoId(req.params.id)
        const report = await Report.findById(req.params.id).populate({path : 'users' , select : '_id name'})


        if(! report){
            return res.json({
                messages : 'چنین گزارش ای یافت نشد',
                success : false
            })
        };



        return res.json({
            data : report ,
            success : true
        })
                    
    } catch (err) {
        console.log(err)
        res.json({
            data : err ,
            success : true
        })
        next();
    }
    }

    async update(req , res , next) {
        try {

            const result = this.validationData(req , res)
            if(! result){
                console.log('validation')
                return res.json({
                    success : result ,
                    messages : req.flash('validationMessage'),
                })
            }

            const {
                title ,
            } = req.body

            await Report.findByIdAndUpdate(req.params.id ,  {$set : {
                user : req.user._id,
                title ,
                slug : this.slug(title) ,
            }})


            return res.json({
                data : 'updated',
                success : true
            })

        } catch (err) {
            console.log(err)
            res.json({
                data : err,
                success : false
            })
            next();
        }
    }

    async delete(req , res , next) {
        try {
            this.isMongoId(req.params.id)
            const report = await Report.findById(req.params.id)
            // return res.json(category.childrens)
            if(! report){ this.apiError(404 , 'چنین گزارش ای یافت نشد')};
    
            await report.deleteOne()    
            

            return res.json({
                data : 'deleted',
                success : true
            })

        } catch (err) {
            console.log(err)
            res.json({
                data : this.apiError(404,  err),
                success : false
            })
            next();
        }
    }

}



module.exports = new reportController();