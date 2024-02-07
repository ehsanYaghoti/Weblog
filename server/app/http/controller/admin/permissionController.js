const Controller = require('../controller');
const Permission = require('app/models/permission');


class permissionController extends Controller {

    async index(req , res , next){ 
        try {
        // console.log(req.query)

        const options = {
        
            page :  req.query.page || 1 ,
            limit : req.query.limit || 10 ,
            sort : { title : req.query.sortPermissionName } ,
            // select :  '_id title books categories user' ,
        }

        let title = new RegExp(req.query.name , 'g')

        
        let permissions = await Permission.paginate({ $or : [ {name : title } , {label : title} ]} , options)

        // console.log(articles)
        if(permissions.docs.length === 0){ return res.json({ data : ' مجوز جهت نمایش وجود ندارد' , 
            success : false
        })}


        return res.json({
            data :  permissions ,
            authenticatedUser : req.user ,
            isAuthenticated : req.isAuthenticated() ,
            success : true
        })
    } catch (err) {
        console.log(err)
        res.json({
            data :  'err' ,
            success : false
        })
        next();
      }
    }

    async create(req , res) {
        try {

            const result = await this.validationData(req , res)
            if(! result){
                return res.json({
                    success : result ,
                    messages : req.flash('validationMessage'),
                })
            }
                
        


        const {
            name ,
            label 
        } = req.body

        const newPermission = new Permission({
            user : req.user._id,
            name ,
            label 
        })

        await newPermission.save();

        return res.json({
            data : newPermission,
            success : true
        })

        } catch (err) {
            return res.json({
                data : err,
                success : false
            })
        }
    }

    async updateForm (req , res , next) {
        try {

        this.isMongoId(req.params.id)
        const permission = await Permission.findById(req.params.id)

        if(! permission){ this.apiError(404 , 'چنین مجوز ای یافت نشد')};


        return res.json({
            data : permission ,
            success : true
        })
                    
    } catch (err) {
        console.log(err)
        res.json({
            data : 'server error' ,
            success : true
        })
        next();
    }
    }

    async update(req , res , next) {
        try {

            const result = await this.validationData(req , res)
            if(! result){
                console.log('validation')
                return res.json({
                    success : result ,
                    messages : req.flash('validationMessage'),
                })
            }

            const {
                name , 
                label
            } = req.body

            // console.log(req.body)
            await Permission.findByIdAndUpdate(req.params.id ,  {$set : {
                user : req.user._id,
                name , 
                label
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
            const permission = await Permission.findById(req.params.id)
            // return res.json(category.childrens)
            if(! permission){ this.apiError(404 , 'چنین مجوز ای یافت نشد')};
    
            await permission.deleteOne()    
            

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



module.exports = new permissionController();