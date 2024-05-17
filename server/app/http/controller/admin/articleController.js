const Controller = require('../controller');
const Article = require('app/models/article');
const Category = require('app/models/category');
const Comment = require('app/models/comment');
const Tag = require('app/models/tag');
const uniqueString = require('unique-string');



class articleController extends Controller {

    async index(req , res , next){ 
        try {
        // console.log(req.query)

        const options = {
            page :  req.query.page || 1 ,
            limit : req.query.limit || 10 ,
            sort : { title : req.query.sortArticleName } ,
            select :  '-images -summary -statement' ,
            populate : [
            {path : 'author' , select : '_id username'} , 
            {path : 'categories' , select : '_id name'} ,
            {path : 'tags' , select : '_id name'} ,

            ]

        }

        let title = new RegExp(req.query.name , 'gi')

        
        let articles = await Article.paginate({ $or : [{title } , {statement : title} ]} , options)

        // console.log(articles)
        if(articles.docs.length === 0){ return res.json({ 
            data : ' مقاله جهت نمایش وجود ندارد' , 
            success : false
        })}

        // console.log(articles)


        return res.json({
            data :  articles ,
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
            statement ,
            readingtime,
            source,
            image ,
            imagepath,
            tags,
            categories,
            language
        } = req.body

        let categoriesArray = categories.split(',')
        let tagsArray = tags.split(',')
        let images = this.imageResize(req.file)

        const token = uniqueString().slice(0,4)

        // console.log(req.body)
        const newArticle = await new Article({
            author : req.user._id,
            title ,
            slug : `${this.slug(title)}_${token}` ,
            statement ,
            language,
            summary : statement,
            readingtime,
            source,
            image ,
            imagepath,
            images,
            thumb : images[480],
            tags : tagsArray,
            categories : categoriesArray,
        })

        await newArticle.save();

        return res.json({
            data : newArticle,
            success : true
        })

        } catch (err) {
            // console.log(err)
            return res.json({
                messages : err,
                success : false
            })
        }
    }

    async updateForm (req , res , next) {
        try {

        this.isMongoId(req.params.id)
        const article = await Article.findById(req.params.id).populate([{path : 'categories' , select : '_id name'} , {path : 'tags' , select : '_id name'}] )
        const categories = await Category.find({})
        const tags = await Tag.find({})


        if(! article){ 
            // return this.apiError( res  , 404 , 'چنین مقاله ای یافت نشد')
            return res.json({
                messages : 'چنین مقاله ای یافت نشد',
                success : false
            })
        };

        // console.log(category , categories)


        return res.json({
            data : article ,
            categories,
            tags,
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
                statement ,
                readingtime,
                source,
                language,
                image ,
                imagepath,
                tags,
                categories,
                likeCount,
                saveCount,
            } = req.body

            let categoriesArray = categories.split(',')
            let tagsArray = tags.split(',')

            const article = await Article.findById(req.params.id)

            let images = article.images
            if(req.file){
                images = this.imageResize(req.file)
            } else {
                images = article.images
            }

            const token = uniqueString().slice(0,4)

            console.log(req.body)
            await Article.findByIdAndUpdate(req.params.id ,  {$set : {
                author : req.user._id,
                title ,
                slug :  `${this.slug(title)}`  ,
                statement ,
                summary : statement,
                language,
                readingtime,
                source,
                image ,
                imagepath,
                images,
                thumb : images[480],
                tags : tagsArray,
                categories : categoriesArray,
                likeCount,
                saveCount
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
            const article = await Article.findById(req.params.id)
            // return res.json(category.childrens)
            if(! article){ this.apiError(404 , 'چنین مقاله ای یافت نشد')};
    
            await article.deleteOne()    
            await Comment.deleteMany({article : article._id })
            

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



module.exports = new articleController();