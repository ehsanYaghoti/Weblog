const Controller = require('../controller')
const Category = require('app/models/category');


class categoryController extends Controller {
    async index(req , res){ 
        try {
        // console.log(req.user)
        // console.log(req.signedCookies)
        const options = {
        
            page :  req.query.page || 1 ,
            limit : req.query.limit || 10 ,
            sort : { name : req.query.sortCategoryName } ,
            select :  '_id name parent childrens' ,
            populate : 'parent childrens'

        }

        let name = new RegExp(req.query.name , 'g')
        let parentQuery = req.query.parent
        let parent = '';
        if(parentQuery === 'father'){
            parent = null
        } else if(parentQuery === 'child'){
            parent = 'child'
        } else {
            parent = ''
        }
        let categories = {}
        if(parent === null){

            categories = await Category.paginate ( {name , parent} , options)
        } else if(parent === 'child'){
            console.log('hello', parent)

            categories = await Category.paginate(  { name  } , options)
            
            let  newCategoriesDocs = categories.docs.filter(item => item.parent !== null)

            categories.docs = newCategoriesDocs

            console.log(categories)

        } else {

            categories = await Category.paginate(  { name } , options)
        }

        if(categories.docs.length === 0){ return res.json({ data : 'دسته ای جهت نمایش وجود ندارد' , 
            success : false
        })}

            // console.log(categories)
        return res.json({
            data :  categories ,
            authenticatedUser : req.user ,
            isAuthenticated : req.isAuthenticated() ,
            success : true
        })
    } catch (err) {
        console.log(err)
        return res.json({
            data :  `${err}` ,
            success : false
        })
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

        // console.log(req.user)
        const {name , parent} = req.body
        const newCategory = new Category({
            user : req.user._id,
            name ,
            slug : this.slug(name) ,
            parent : parent !== 'none' ? parent : null ,
            
        })

        await newCategory.save();

        return res.json({
            data : newCategory,
            success : true
        })

        } catch (err) {
            return res.json({
                data : err,
                success : false
            })
        }
    }

    async updateForm (req , res) {
        try {

        this.isMongoId(req.params.id)
        const category = await Category.findById(req.params.id)
        const categories = await Category.find({parent : null}).select('name _id')
        if(! category){ return res.josn({
            data : 'چنین دسته ای یافت نشد',
            success : false
        }) };

        // console.log(category , categories)


        return res.json({
            data : 
                {
                    category ,
                    categories
                } ,
            success : true
        })
                    
    } catch (err) {
        return res.json({
            data : err ,
            success : true
        })
    }
    }

    async update(req , res) {
        try {

            const result = await this.validationData(req , res)
            if(! result){
                return res.json({
                    success : result ,
                    messages : req.flash('validationMessage'),
                })
            }

            const {name , parent} = req.body

            await Category.findByIdAndUpdate(req.params.id , {$set : {
                user : req.user._id,
                name ,
                slug : this.slug(name) ,
                parent : parent !== 'none' ? parent : null ,
            }})


            return res.json({
                data : 'updated',
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
            const category = await Category.findById(req.params.id).populate('childrens').exec()
            // return res.json(category.childrens)
            if(! category){ this.error(404 , 'چنین دسته ای یافت نشد')};
    

            await category.childrens.forEach(child => child.deleteOne())
            await category.deleteOne()    
            // console.log(deleted.resolve())

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



module.exports = new categoryController();