const Controller = require('../controller')
const Tag = require('app/models/tag');


class tagController extends Controller {
    async index(req , res){ 
        try {

        const options = {

            page :  req.query.page || 1 ,
            limit : req.query.limit || 10 ,
            sort : { name : req.query.sortTagName } ,
            select :  '_id name slug explain user' ,
            populate : [
            {path : 'posts' ,  select : 'title'},
            {path : 'articles' ,  select : 'title'},
            {path : 'podcasts' ,  select : 'title'},
            {path : 'followers' ,  select : 'username'},
            ]

        }

        let name = new RegExp(req.query.name , 'gi')

        // console.log(req.query.name)
        let tags = await Tag.paginate({} , options)

        if(tags.docs.length === 0){ 
            return res.json({ 
                messages : 'تگ ای جهت نمایش وجود ندارد' , 
                success : false
        })}

        console.log(tags)

        return res.json({
            data :  tags ,
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

        const result = this.validationData(req , res)
        if(! result){
            return res.json({
                success : result ,
                messages : req.flash('validationMessage'),
            })
        }

        // console.log(req.user)
        const { name , explain } = req.body
        const newTag = new Tag({
            user : req.user._id,
            name ,
            explain,
            slug : this.slug(name) ,
        })

        await newTag.save();

        return res.json({
            data : newTag,
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
        const tag = await Tag.findById(req.params.id)
        if(! tag){ return res.josn({
            data : 'چنین تگ ای یافت نشد',
            success : false
        }) };

        // console.log(tag , tags)


        return res.json({
            data :{
                tag ,
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

            const {name , explain} = req.body

            await Tag.findByIdAndUpdate(req.params.id , {$set : {
                user : req.user._id,
                name ,
                explain,
                slug : this.slug(name) ,
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
            const tag = await Tag.findById(req.params.id)
            // return res.json(tag.childrens)
            if(! tag){ 
                this.error(404 , 'چنین تگ ای یافت نشد')
                return res.json({
                    success : false,
                    data : "چنین تگ ای یافت نشد"
                })
            };
    
            await tag.deleteOne()    
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



module.exports = new tagController();