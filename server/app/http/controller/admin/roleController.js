const Controller = require('../controller');
const Permission = require('app/models/permission');
const Role = require('app/models/role');



class roleController extends Controller {

    async index(req , res , next){ 
        try {
        // console.log(req.query)

        const options = {
            page :  req.query.page || 1 ,
            limit : req.query.limit || 10 ,
            sort : { name : req.query.sortRoleName } ,
            populate : {path : 'permissions' }
        }

        let title = new RegExp(req.query.name , 'g')

        
        let roles = await Role.paginate({ $or : [ {name : title } , {label : title} ]} , options)

        // console.log(articles)
        if(roles.docs.length === 0){ return res.json({ data : ' نقش جهت نمایش وجود ندارد' , 
            success : false
        })}


        return res.json({
            data :  roles ,
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
                
        
            
        //    return console.log(JSON.parse(req.body.permissions))
        console.log(req.body)

        const {
            name ,
            label ,
            permissions,
        } = req.body

        const newRole = new Role({
            user : req.user._id,
            name ,
            label ,
            permissions : req.body.postPermissions
        })

        await newRole.save();

        return res.json({
            data : newRole,
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
        const role = await Role.findById(req.params.id).populate({path : 'permissions'}).exec();

        const permissions = await Permission.find({})

        if(! role){ this.apiError(404 , 'چنین نقش ای یافت نشد')};


        return res.json({
            data : role ,
            permissions,
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
                label,
                permissions
            } = req.body

            // console.log(req.body)
            await Role.findByIdAndUpdate(req.params.id ,  {$set : {
                user : req.user._id,
                name , 
                label,
                permissions : req.body.postPermissions
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
            const role = await Role.findById(req.params.id)
            // return res.json(category.childrens)
            if(! role){ this.apiError(404 , 'چنین نقش ای یافت نشد')};
    
            await role.deleteOne()    
            

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



module.exports = new roleController();