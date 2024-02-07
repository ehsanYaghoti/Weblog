const autoBind = require('auto-bind');
const { validationResult } = require('express-validator');
const Recaptcha = require('express-recaptcha').RecaptchaV2
const isMongoId = require('validator/lib/isMongoId');
const sharp = require('sharp');
const path = require('path');
const User = require('app/models/user');

module.exports =  class controller {
    constructor(){
        autoBind(this),
        this.setConfigRecaptcha()
    }
    
    setConfigRecaptcha(){
        this.recaptcha = new Recaptcha('6LdQCnYaAAAAAJORGrWxBlb_U5cYNGi9LHqzNABx' ,
                                        '6LdQCnYaAAAAAJyTzK9JXwvqJ2pvB_bZDi25jXJQ',
                                        {hl : 'fa'}) 
    }

    recaptchaValidation(req , res){
        return new Promise((resolve , reject)=>{
            this.recaptcha.verify(req , (err , data)=>{
                if(err){
                    req.flash('validationMessage' , 'گزینه امنیتی مربوط به شناسایی ربات خاموش می باشد،لطفا مجدداً تلاش بفرمایید');
                    // return this.back(req , res);
                } else {
                    resolve(true)
                }
            })
        })

    }

    validationData(req , res){
        let errors = validationResult(req).errors
        let fullErrors = validationResult(req).errors
        let errorMessages = [] 
        errors.forEach(error => {
            errorMessages.push(error.msg)
        });
        // console.log(errorMessages)
        if(errorMessages.length){
            req.flash('fullValidationMessages' , fullErrors)
            req.flash('validationMessage' , errorMessages)
            return false;
        }  

        return true;
    }

    back(req , res) {
        // console.log(req.body)
        req.flash('formData' , req.body)
        // res.redirect(`${req.header('Referer')}`)
    }

    sweetAlert(req , data) {
        let title = data.title || '',
            message = data.message || '',
            type = data.type || 'info',
            button = data.button || null,
            timer = data.timer || 2000

        req.flash('sweetalert' , { title , message , type , button , timer })
    }

    slug(title){
        return title.replace(/([^a-zA-Z0-9آ-ی۰-۹]|-)+/g , "-")
    }

    isMongoId(idParam){
        if( ! isMongoId(idParam)){
            return this.apiError(404 , "آی دی وارد شده صحیح نمی باشد")
        }
    }

    error(status = 500 , message){
        let err = new Error(message)
        err.status = status
        console.log(err)
        throw err;
    }

    apiError( res , status = 500 , message){
        let err = new Error(message)
        err.status = status
        console.log(err)
        res.json({
            messages : err ,
            success : false
        })
    }

    imageResize(image , res){
        // console.log(res)
        // console.log(image)
        const imageInfo = path.parse(image.path)

        let AddressImages = {}
        AddressImages['original'] = this.getUrlImages(`${image.destination}/${image.filename}`)
        
        const resize = size =>{
            let imageName = `${imageInfo.name}-${size}${imageInfo.ext}`
            AddressImages[size] = this.getUrlImages(`${image.destination}/${imageName}`)
            sharp(image.path)
            .resize(size , null)
            .toFile(`${image.destination}/${imageName}`)
        }
        let imageSizes = [1080 , 720 , 480 , 360]
        
        imageSizes.map(resize)
            
        return AddressImages
    }

    getUrlImages(dir){
        return dir.substr(8);
    }

    async checkUserLikdeAndSavedArticles(req , articles = null , article = null){
        // console.log(articles)
        // console.log(article)

        let user = {}
        if(req.isAuthenticated()){
            user = await User.findById(req.user.id).populate({path : 'likes saves'}).exec()

            let userLikedArticles = []
            userLikedArticles = user.likes.map(like => {
                if(like.article){
                    return like.article.toString()
                }
                return ''
            })

            let userSavedArticles = []
            userSavedArticles = user.saves.map(save => {
                if(save.article){
                    return save.article.toString()
                }
                return ''
            })

            if(articles !== null){
                if(Array.isArray(articles.docs)){
                articles.docs.forEach(async article => {
                let articleId = article._id.toString()
                // console.log(articleId)

                if(userLikedArticles.includes(articleId)){
                    // console.log('yes')
                    await article.updateOne({
                        likedByThisUser : true
                    })
                } else{
                    // console.log('no')
                    await article.updateOne({
                        likedByThisUser : false
                    })
                }

                if(userSavedArticles.includes(articleId)){
                    // console.log('yes')
                    await article.updateOne({
                        savedByThisUser : true
                    })
                } else{
                    // console.log('no')
                    await article.updateOne({
                        savedByThisUser : false
                    })
                }


                })
                } else if(Array.isArray(articles)){
                    articles.forEach(async article => {
                        let articleId = article._id.toString()
                        // console.log(articleId)
        
                        if(userLikedArticles.includes(articleId)){
                            // console.log('yes')
                            await article.updateOne({
                                likedByThisUser : true
                            })
                        } else{
                            // console.log('no')
                            await article.updateOne({
                                likedByThisUser : false
                            })
                        }
        
                        if(userSavedArticles.includes(articleId)){
                            // console.log('yes')
                            await article.updateOne({
                                savedByThisUser : true
                            })
                        } else{
                            // console.log('no')
                            await article.updateOne({
                                savedByThisUser : false
                            })
                        }
        
        
                        })  
                }
            }


            if(article !== null){
                let articleId = article._id.toString()
                // console.log(articleId)

                if(userLikedArticles.includes(articleId)){
                    // console.log('yes liked')
                    await article.updateOne({
                        likedByThisUser : true
                    })
                } else{
                    // console.log('no liked')
                    await article.updateOne({
                        likedByThisUser : false
                    })
                }

                if(userSavedArticles.includes(articleId)){
                    // console.log('yes saved')
                    await article.updateOne({
                        savedByThisUser : true
                    })
                } else{
                    // console.log('no saved')
                    await article.updateOne({
                        savedByThisUser : false
                    })
                }
            }
        }
    }

    async checkUserLikdeAndSavedPodcasts(req , podcasts = null , podcast = null){
        let user = {}
        if(req.isAuthenticated()){
            user = await User.findById(req.user.id).populate({path : 'likes saves'}).exec()

            let userLikedPodcasts = []
            userLikedPodcasts = user.likes.map(like => {
                if(like.podcast){
                    return like.podcast.toString()
                }
                return ''
            })

            let userSavedPodcasts = []
            userSavedPodcasts = user.saves.map(save => {
                if(save.podcast){
                    return save.podcast.toString()
                }
                return ''
            })

            if(podcasts !== null){
                if(Array.isArray(podcasts.docs)){
                podcasts.docs.forEach(async podcast => {
                let podcastId = podcast._id.toString()
                // console.log(podcastId)

                if(userLikedPodcasts.includes(podcastId)){
                    // console.log('yes')
                    await podcast.updateOne({
                        likedByThisUser : true
                    })
                } else{
                    // console.log('no')
                    await podcast.updateOne({
                        likedByThisUser : false
                    })
                }

                if(userSavedPodcasts.includes(podcastId)){
                    // console.log('yes')
                    await podcast.updateOne({
                        savedByThisUser : true
                    })
                } else{
                    // console.log('no')
                    await podcast.updateOne({
                        savedByThisUser : false
                    })
                }


                })
                } else if(Array.isArray(podcasts)){
                    podcasts.forEach(async podcast => {
                        let podcastId = podcast._id.toString()
                        // console.log(podcastId)
        
                        if(userLikedPodcasts.includes(podcastId)){
                            // console.log('yes')
                            await podcast.updateOne({
                                likedByThisUser : true
                            })
                        } else{
                            // console.log('no')
                            await podcast.updateOne({
                                likedByThisUser : false
                            })
                        }
        
                        if(userSavedPodcasts.includes(podcastId)){
                            // console.log('yes')
                            await podcast.updateOne({
                                savedByThisUser : true
                            })
                        } else{
                            // console.log('no')
                            await podcast.updateOne({
                                savedByThisUser : false
                            })
                        }
        
        
                        })  
                }
            }


            if(podcast !== null){
                let podcastId = podcast._id.toString()
                // console.log(podcastId)

                if(userLikedPodcasts.includes(podcastId)){
                    // console.log('yes liked')
                    await podcast.updateOne({
                        likedByThisUser : true
                    })
                } else{
                    // console.log('no liked')
                    await podcast.updateOne({
                        likedByThisUser : false
                    })
                }

                if(userSavedPodcasts.includes(podcastId)){
                    // console.log('yes saved')
                    await podcast.updateOne({
                        savedByThisUser : true
                    })
                } else{
                    // console.log('no saved')
                    await podcast.updateOne({
                        savedByThisUser : false
                    })
                }
            }
        }
    }

    async checkUserLikdedComments(req , comments = null){
        // console.log(comments)
        // console.log(comment)

        let user = {}
        if(req.isAuthenticated()){
            user = await User.findById(req.user.id).populate({path : 'likes'}).exec()

            let userLikedComments = []
            userLikedComments = user.likes.map(like => {
                if(like.comment){
                    return like.comment.toString()
                }
                return ''
            })

            if(comments !== null){
                if(Array.isArray(comments.docs)){
                    comments.docs.forEach(async comment => {
                        let commentId = comment._id.toString()

                        if(userLikedComments.includes(commentId)){
                            // console.log('yes')
                            await comment.updateOne({
                                likedByThisUser : true
                            })
                        } else{
                            // console.log('no')
                            await comment.updateOne({
                                likedByThisUser : false
                            })
                        }
                    })
                } else if(Array.isArray(comments)){
                    comments.forEach(async comment => {
                        let commentId = comment._id.toString()
                        // console.log(commentId)
        
                        if(userLikedComments.includes(commentId)){
                            // console.log('yes liked')
                            await comment.updateOne({
                                likedByThisUser : true
                            })
                        } else{
                            // console.log('no liked')
                            await comment.updateOne({
                                likedByThisUser : false
                            })
                        }
                    })  
                }
            }

        }
    }

    async checkUserSavedPosts(req , posts = null , post = null){
        let user = {}
        if(req.isAuthenticated()){
            user = await User.findById(req.user.id).populate({path : 'saves'}).exec()


            let userSavedPosts = []
            userSavedPosts = user.saves.map(save => {
                if(save.post){
                    return save.post.toString()
                }
                return ''
            })

            if(posts !== null){
                if(Array.isArray(posts.docs)){
                posts.docs.forEach(async post => {
                let postId = post._id.toString()
                // console.log(postId)

                if(userSavedPosts.includes(postId)){
                    // console.log('yes')
                    await post.updateOne({
                        savedByThisUser : true
                    })
                } else{
                    // console.log('no')
                    await post.updateOne({
                        savedByThisUser : false
                    })
                }


                })
                } else if(Array.isArray(posts)){
                    posts.forEach(async post => {
                        let postId = post._id.toString()
                        // console.log(postId)
                
                        if(userSavedPosts.includes(postId)){
                            // console.log('yes')
                            await post.updateOne({
                                savedByThisUser : true
                            })
                        } else{
                            // console.log('no')
                            await post.updateOne({
                                savedByThisUser : false
                            })
                        }
        
        
                        })  
                }
            }


            if(post !== null){
                let postId = post._id.toString()
                // console.log(postId)

                if(userSavedPosts.includes(postId)){
                    // console.log('yes saved')
                    await post.updateOne({
                        savedByThisUser : true
                    })
                } else{
                    // console.log('no saved')
                    await post.updateOne({
                        savedByThisUser : false
                    })
                }
            }


        }
    }

    async checkUserFollowedTags(req , tags = null , tag = null){
        let user = {}
        if(req.isAuthenticated()){
            user = await User.findById(req.user.id).populate({path : 'tags'}).exec()


            let userFollowedTags = []
            userFollowedTags = user.tags.map(tag => {
                return tag._id.toString()
            })
            

            if(tags !== null){
                if(Array.isArray(tags.docs)){
                tags.docs.forEach(async tag => {

                let tagId = tag._id.toString()
                // console.log(tagId)

                if(userFollowedTags.includes(tagId)){
                    // console.log('yes')
                    await tag.updateOne({
                        followedByThisUser : true
                    })
                } else{
                    // console.log('no')
                    await tag.updateOne({
                        followedByThisUser : false
                    })
                }


                })
                } else if(Array.isArray(tags)){
                    tags.forEach(async tag => {
                        let tagId = tag._id.toString()
                        // console.log(tagId)
                
                        if(userFollowedTags.includes(tagId)){
                            // console.log('yes')
                            await tag.updateOne({
                                followedByThisUser : true
                            })
                        } else{
                            // console.log('no')
                            await tag.updateOne({
                                followedByThisUser : false
                            })
                        }
        
        
                        })  
                }
            }


            if(tag !== null){
                let tagId = tag._id.toString()
                // console.log(tagId)

                if(userFollowedTags.includes(tagId)){
                    // console.log('yes saved')
                    await tag.updateOne({
                        followedByThisUser : true
                    })
                } else{
                    // console.log('no saved')
                    await tag.updateOne({
                        followedByThisUser : false
                    })
                }
            }


        }
    }

    async checkUserFollowedUsers(req , users = null , user = null){
        let authenticatedUser = {}
        if(req.isAuthenticated()){
            authenticatedUser = await User.findById(req.user.id).populate({path : 'followings'}).exec()


            let userFollowedUsers = []
            userFollowedUsers = authenticatedUser.followings.map(user => {
                return user._id.toString()
            })
            

            if(users !== null){
                if(Array.isArray(users)){
                    users.forEach(async user => {
                        let userId = user._id.toString()
                
                        if(userFollowedUsers.includes(userId)){
                            await user.updateOne({
                                followedByThisUser : true
                            })
                        } else{
                            await user.updateOne({
                                followedByThisUser : false
                            })
                        }
        
                    })  
                }
            }


            if(user !== null){
                let userId = user._id.toString()

                if(userFollowedUsers.includes(userId)){
                    await user.updateOne({
                        followedByThisUser : true
                    })
                } else{
                    await user.updateOne({
                        followedByThisUser : false
                    })
                }
                
            }


        }
    }
    
    timeMaker(req){
        let createdAt = req.query.createdAt
        let date = Date.now()
        switch (createdAt) {
            case '1weekAgo':
                date =  Date.now() - 1000 * 60 * 60 * 24 * 7
                return new Date(date)
                break;
            case '1monthAgo':
                date = Date.now() - 1000 * 60 * 60 * 24 * 30
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

    sortManager(query) {
        let sort = {}
        if(query.hasOwnProperty('likeCount')){
            sort.likeCount = query.likeCount
            return sort
        } else if(query.hasOwnProperty('saveCount')){
            sort.saveCount = query.saveCount
            return sort
        } else if(query.hasOwnProperty('viewCount')){
            sort.viewCount = query.viewCount
            return sort
        } else if(query.hasOwnProperty('commentCount')){
            sort.commentCount = query.commentCount
            return sort
        } else if(query.hasOwnProperty('date')){
            sort.createdAt = query.date
            return sort
        } else if(query.hasOwnProperty('saveCount')){
            sort.saveCount = query.saveCount
            return sort
        } else {
            sort.createdAt = 'desc'
            return sort
        }
    }
    
    filteCategoryManager(query) {
        let filter = {}

        if(query.hasOwnProperty('category')){
            filter.category = query.category
            return filter
        } else if(query.hasOwnProperty('createdAt')){
            filter.createdAt = query.createdAt
            return filter
        } else {
            filter = {}
            return filter
        }
    }


}