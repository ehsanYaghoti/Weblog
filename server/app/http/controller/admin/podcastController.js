const Controller = require('../controller');
const Podcast = require('app/models/podcast');
const Category = require('app/models/category');
const Comment = require('app/models/comment');
const Tag = require('app/models/tag');
const mm = require('music-metadata');
const util = require('util');
const uniqueString = require('unique-string');


class podcastController extends Controller {

    async index(req , res){ 
        try {

        const options = {
         
            page :  req.query.page || 1 ,
            limit : req.query.limit || 10 ,
            sort : { title : req.query.sortPodcastName } ,
            // select :  '_id title user statemnt tags categories likes' ,
            // populate : 'saves comments'
            populate : [
                {path : 'user' , select : '_id username'} , 
                {path : 'categories' , select : '_id name'} ,
                {path : 'tags' , select : '_id name'} ,
    
            ]

        }

        let search = new RegExp(req.query.name , 'gi')

        
        let podcasts = await Podcast.paginate({ $or : [{title : search } , {statemnt : search}   ]} , options)

        if(podcasts.docs.length === 0){ 
            return res.json({ 
                messages : 'پادکست جهت نمایش وجود ندارد' , 
                success : false
            })
        }


        return res.json({
            data :  podcasts ,
            authenticatedUser : req.user ,
            isAuthenticated : req.isAuthenticated() ,
            success : true
        })
    } catch (err) {
            
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
        

            const {
                title ,
                statement ,
                language,
                image ,
                sound,
                imagepath,
                soundpath,
                tags,
                categories,
            } = req.body

            const time = await this.timeFinder(soundpath)
            
            let categoriesArray = categories.split(',')
            let tagsArray = tags.split(',')
            let images = this.imageResize(req.files['image'][0])

            let podcastNumber = 1
            const lastPodcast = await Podcast.find({}).sort({createdAt : 'desc' }).select('number').limit(1)
            console.log(lastPodcast)

            if(lastPodcast.length !== 0 && lastPodcast !== undefined){
                podcastNumber = lastPodcast[0].number + 1
            }

            const token = uniqueString().slice(0,4)

            const newPodcast = new Podcast({
                user : req.user._id,
                slug : `${this.slug(title)}_${token}` ,
                title ,
                statement ,
                language,
                sound,
                soundTime : time,
                image ,
                images,
                thumb : images[480],
                imagepath,
                soundpath,
                number :  podcastNumber ,
                categories : categoriesArray,
                tags : tagsArray
            })

            await newPodcast.save();

            return res.json({
                data : newPodcast,
                success : true
            })

        } catch (err) {
            console.log(err)
            return res.json({
                data : err,
                success : false
            })
        }
    }

    async updateForm (req , res) {
        try {
        
        this.isMongoId(req.params.id)
        const podcast = await Podcast.findById(req.params.id).populate({path : 'tags categories' , select : '_id name'})
        const categories = await Category.find({})
        const tags = await Tag.find({})

        // console.log(podcast.image)

        if(! podcast){ 
            // return this.apiError( res  , 404 , 'چنین مقاله ای یافت نشد')
            return res.json({
                messages : 'چنین مقاله ای یافت نشد',
                success : false
            })
        };

        // let image22 = import(podcast.imagepath)

        // console.log(image22)
        // console.log(podcast)

        return res.json({
            data : podcast ,
            categories,
            tags,
            success : true
        })
                    
    } catch (err) {
        return res.json({
            messages : err ,
            success : true
        })
    }
    }

    async update(req , res) {
        try {

            const result =  this.validationData(req , res)
            if(! result){
                return res.json({
                    success : result ,
                    messages : req.flash('validationMessage'),
                })
            }

            let {
                title ,
                statement ,
                image ,
                sound,
                imagepath,
                soundpath,
                tags,
                categories,
                
            } = req.body

            let categoriesArray = categories.split(',')
            let tagsArray = tags.split(',')
            
            const podcast = await Podcast.findById(req.params.id)

            let images = podcast.images

            let previousSoundPath = podcast.soundpath
            let previousImagePath = podcast.imagepath

            let newSoundPath = req.body.soundpath
            let newImagePath = req.body.imagepath

            if(req.files['image']){
                images = this.imageResize(req.files['image'][0])
                imagepath = newImagePath
            } else {
                images = podcast.images
                imagepath = previousImagePath
            }

            if(req.files['sound']){
                soundpath = newSoundPath
            } else {
                soundpath = previousSoundPath
            }

            const time = await this.timeFinder(soundpath)

            let thumb = null
            if(images){thumb = images[480]}

            const token = uniqueString().slice(0,4)

            await Podcast.findByIdAndUpdate(req.params.id ,  {$set : {
                user : req.user._id,
                title ,
                slug : `${this.slug(title)}` ,
                statement ,
                sound,
                soundpath,
                soundTime : time,
                image ,
                imagepath,
                images,
                thumb ,
                categories : categoriesArray, 
                tags : tagsArray
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
            const podcast = await Podcast.findById(req.params.id)
            // return res.json(category.childrens)
            if(! podcast){ this.error(404 , 'چنین پادکست ای یافت نشد')};
    
            await podcast.deleteOne()    
            await Comment.deleteMany({podcast : podcast._id })
            

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

    async timeFinder(soundPath){
        const metadata = await mm.parseFile(`${soundPath}`);

        let minutes = Math.floor(metadata.format.duration/60)
        let extraSeconds = parseInt(metadata.format.duration % 60)
        minutes = minutes < 10 ? "0" + minutes : minutes;
        extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

        let time = `${minutes}:${extraSeconds}`
        return time
    }

}



module.exports = new podcastController();