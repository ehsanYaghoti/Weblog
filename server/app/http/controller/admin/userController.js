const Controller = require('../controller')
const User = require('app/models/user');
const Role = require('app/models/role');
const passport = require('passport')
const CORS = require('cors')

class userController extends Controller {
    async index(req , res , next){ 
        try {
            
        
        // console.log(req.query)
        
        function sortManager(query) {
            let sort = {}
            if(query.hasOwnProperty('sortCreatedAt')){
                sort.createdAt = req.query.sortCreatedAt 
                return sort
            } else if(query.hasOwnProperty('sortUsername')){
                sort.username = req.query.sortUsername
                return sort
            } else if(query.hasOwnProperty('sortEmail')){
                sort.email = req.query.sortEmail
                return sort
            } else {
                sort.createdAt = 'desc'
                return sort
            }
        }

        const options = {
            page :  req.query.page || 1 ,
            limit : req.query.limit || 10 ,
            sort : sortManager(req.query) ,
            select :  '_id username email premission createdAt admin avatar avatarpath roles',
            populate : 'roles'
        }

        function timeMaker(){
            let createdAt = req.query.createdAt
            let date = Date.now()
            switch (createdAt) {
                case '1monthAgo':
                    date =  Date.now() - 1000 * 60 * 60 * 24 * 30
                    return new Date(date)
                    break;
                case '2monthAgo':
                    date = Date.now() - 1000 * 60 * 60 * 24 * 60
                    return new Date(date)
                break;
                case '1yearAgo' :
                    date = Date.now() - 1000 * 60 * 60 * 24 * 30 * 12 
                    return new Date(date)
                break;
                default :
                    date = Date.now() - 1000 * 60 * 60 * 24 * 30 * 24
                    return new Date(date)
                break;
            }
        }

        function filterManager(){     
            let filter = {}
            let premission = req.query.premission
            switch (premission) {
                case 'admin':
                    return  filter={ admin : true}
                case 'viewer':
                    return filter={ admin : false}
                case 'all':
                    return filter={$or : [{admin :  true} , {admin : false}]}
                default :
                    return filter={$or : [{admin :  true} , {admin : false}]}
            }
        }
        // let search = new RegExp(`([${req.query.search}])\w+`, 'g')

        let search = ''


        let createdAt = timeMaker()
        let filter = filterManager()          
        
        let users = {}
        search = new RegExp(`${req.query.search}`, 'g')

        if(req.query.search !== ''){
            search = new RegExp(`${req.query.search}`, 'g')
            // users = await User.paginate( { username : search ,  ...filter , createdAt : {"$gte" : createdAt } } , options)
            users = await User.paginate( { $or : [ {email : search },{ username : search} ] , ...filter , createdAt : {"$gte" : createdAt } } , options)

            return res.json({
                data :  users ,
                authenticatedUser : req.user ,
                isAuthenticated : req.isAuthenticated() ,
                success : true
            })

        }


        // console.log(req.query.search)
        console.log(req.query)


        // $or : [ {email : search },{ username : search} ] ,
        // console.log(username , createdAt , premissionState)
        users = await User.paginate( { $or : [ {email : search },{ username : search} ] ,  ...filter , createdAt : {"$gte" : createdAt } } , options)
 
        if(users.docs.length === 0){ 
            return res.status(204).json({ 
                data : 'چنین کاربری وجود ندارد' , 
                success : false
        })}

        return res.json({
            data :  users ,
            authenticatedUser : req.user ,
            isAuthenticated : req.isAuthenticated() ,
            success : true
        })

        } catch (error) {
            console.log(error)
            res.json({
                message : error,
                success : false
            })
            next()
        }
    }

    async createProcess(req , res , next){
        // await this.recaptchaValidation(req , res)
        const result = await this.validationData(req , res)
        if(result){ 
            return this.create(req , res , next)
        }

        
        return res.json({
            result ,
            messages : req.flash('validationMessage'),
        })

    }

    async create(req , res , next ){
        try {



            passport.authenticate('local.register' , {failureRedirect : 'http://localhost:3000/users/create'
                , successRedirect : 'http://localhost:3000/users' 
                , failureFlash : true } , ()=> {

                res.json({ 
                    result : true
                })
            })(req  , res , next)

        } catch (err) {
            return res.json({
                data : err.meesage,
                succcess : false
            }) 
        }

    }

    async editForm (req , res) {
    try {
            this.isMongoId(req.params.id)
            let id = `${req.params.id}`
            const user = await  User.findById(id).populate('roles')
            const roles = await Role.find({})
            
            if(! user){
                //  this.error(404 , 'چنین کاربر ای یافت نشد')
                return res.josn('چنین کاربر ای یافت نشد')
            };


            return res.json({
                data :  user ,
                roles,
                success : true
            })
        } catch (err) {
            return res.json({
                data : err,
                success : false
            })
        }
    }

    async editProcess(req , res , next){
        // await this.recaptchaValidation(req , res)
        const success = await this.validationData(req , res)
        if(success){
            return this.edit(req , res , next)
        }

        // req.flash('formData' , req.body)
        // console.log(success)
        return res.json({
            success ,
            messages : req.flash('validationMessage'),
        })

    }

    async edit(req , res , next){
        try {

            const {username , email , roles} = req.body


            console.log(req.body)
            

            let user = await  User.findByIdAndUpdate(req.params.id , {$set : {
                username ,
                email,
                roles
            }})

            console.log(req.body)

            return res.json({
                data : user,
                success : true
            })

        } catch (err) {
            return res.json({
                data : err,
                success : false
            })
        }
    }
    
    async setAdmin(req , res , next){
        try {

            console.log(req.body)
            const id = req.body.userId

            let user = await User.findById(id)

            if(user.admin){
                user = await  User.findByIdAndUpdate(id , {$set : {
                    admin : false
                }})
            } else if(!user.admin){
                user = await  User.findByIdAndUpdate(id , {$set : {
                    admin : true
                }})
            }

            // const options = {
        
            //     page :  req.query.page || 1 ,
            //     limit : req.query.limit || 10 ,
            //     sort : { createdAt : 'desc' } ,
            //     select :  '_id username email premission createdAt admin avatar tags',
            // }

            // let users = await User.paginate( {} , options)


        
            return res.json({
                data : user,
                // data : users,
                success : true
            })

        } catch (err) {
            return res.json({
                data : err,
                success : false
            })
        }
    }

    async delete(req , res , next) {
        try {
            this.isMongoId(req.params.id)
            const user = await User.findById(req.params.id)

            if(! user){ this.error(404 , 'چنین کاربر ای یافت نشد')};
            
            await user.deleteOne()    

            return res.json({
                data : 'deleted',
                success : true
            })

        } catch (err) {
            return res.json({
                data : this.error(404,  err),
                success : false
            })
        }
    }


}



module.exports = new userController();