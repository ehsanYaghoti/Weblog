const Controller = require('../controller');
const Post = require('app/models/post');
const Category = require('app/models/category');
const Answer = require('app/models/answer');
const Tag = require('app/models/tag');
const uniqueString = require('unique-string');



class postController extends Controller {

    async index(req , res){ 
        try {

        const options = {
        
            page :  req.query.page || 1 ,
            limit : req.query.limit || 10 ,
            sort : { title : req.query.sortpostName } ,
            // select :  '_id title author categories' ,
            populate : [
                'tags user',
                { path : 'reports' , select : 'title'},
                { path : 'user' , select : '_id username'},

            ]
        } 

        let name = new RegExp(req.query.name , 'gi')

        
        let posts = await Post.paginate({ $or : [{title : name }  ]} , options)

        if(posts.docs.length === 0){ return res.json({
            messages : ' پستی جهت نمایش وجود ندارد' , 
            success : false
        })}


        return res.json({
            data :  posts ,
            authenticatedUser : req.user ,
            isAuthenticated : req.isAuthenticated() ,
            success : true
        })
    } catch (err) {
        console.log(err)
        return res.json({
            messages :  err ,
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

            
            const token = uniqueString().slice(0,4)

            const {
                title ,
                statement ,
                tags,
                language,
            } = req.body

            console.log(req.body.tags)
            
            // let tagsArray = req.body.tags.split(',')
            // let images = this.imageResize(req.file)
            const newpost = await new Post({
                user : req.user._id,
                title ,
                slug : `${this.slug(title)}_${token}` ,
                statement ,
                summary : statement,
                tags ,
                language,

            })

            await newpost.save();
 
            return res.json({
                data : newpost,
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

    async updateForm (req , res) {
        try {
        
        this.isMongoId(req.params.id)
        const post = await Post.findById(req.params.id).populate({path : 'tags' , select : '_id name'})
        const tags = await Tag.find({})

        if(! post){ this.error(404 , 'چنین پست ای یافت نشد')};

        return res.json({
            data : post ,
            tags,
            success : true
        })
                    
    } catch (err) {
        return res.json({
            data : messages ,
            success : false
        })
    }
    }

    async update(req , res) {
        try {

            const result = this.validationData(req , res)
            if(! result){
                return res.json({
                    success : result ,
                    messages : req.flash('validationMessage'),
                })
            }

            // const token = uniqueString().slice(0,4)
            // slug : `${this.slug(req.body.title)}_${token}` ,

            const input = {
                ...req.body,
                slug : `${this.slug(req.body.title)}` ,
                user : req.user._id, 
            }

            // let categoriesArray = input.categories.split(',')

            // const post = await Post.findById(req.params.id)

            // let images = post.images
            // if(req.file){
            //     images = this.imageResize(req.file)
            // } else {
            //     images = post.images
            // }

            await Post.findByIdAndUpdate(req.params.id ,  {$set : {
                ...input,
            }})


            return res.json({
                data : 'updated',
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

    async delete(req , res , next) {
        try {
            this.isMongoId(req.params.id)
            const post = await Post.findById(req.params.id)

            if(! post){ this.error(404 , 'چنین محصول ای یافت نشد')};
    
            await post.deleteOne()    
            await Answer.deleteMany({post : post._id})        

            return res.json({
                data : 'deleted',
                success : true
            })

        } catch (err) {
            return res.json({
                messages : this.error(404,  err),
                success : false
            })
        }
    }

}



module.exports = new postController();