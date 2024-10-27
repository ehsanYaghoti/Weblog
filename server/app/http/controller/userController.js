const Controller = require('./controller');
const User = require('app/models/user');
const ActiveationCode = require('app/models/activeationCode');
// const client = require('app/helper/sms');
const Category = require('app/models/category');
const Tag = require('app/models/tag');


class userController extends Controller {
    async activation(req , res){

        let activationCode = await ActiveationCode.findOne({code : req.params.code}).populate('user').exec();

        if(! activationCode){
            this.sweetAlert(req , {
                title : 'توجه',
                message : 'لینک فعال سازی اکانت  معتبر نمی باشد لطفا دوباره اقدام کنید',
                type : 'warning',
                button : 'بسیار خوب'
            })

            return res.redirect('/')
        }

        if(activationCode.use){
            this.sweetAlert(req , {
                title : 'توجه',
                message : 'لینک فعال سازی اکانت قبلا استفاده شده است لطفا دوباره اقدام کنید',
                type : 'warning',
                button : 'بسیار خوب'
            })

            return res.redirect('/')
        }

        if(activationCode.expire < new Date()){
            this.sweetAlert(req , {
                title : 'توجه',
                message : 'لینک فعال سازی اکانت منقضی است لطفا دوباره اقدام کنید',
                type : 'warning',
                button : 'بسیار خوب'
            })

            return res.redirect('/')
        }

        let user = activationCode.user

        user.$set('active' , true);
        activationCode.$set('use' , true);

        await user.save();
        await activationCode.save();

        req.login(user , async (err)=>{
            if(err) console.log(err)

            if(req.body.rememberme) {
                user.setRememberToken(res);
            }

            await this.sweetAlert(req , {
                title : 'توجه',
                message :  'فعال سازی اکانت با موفقیت انجام شد',
                type : 'success',
                timer : 3000
            })
    
    
            return res.redirect('/')


        })



       
    }

    async checkAuth(req , res , next){
        try {

            if(req.user){
                const user = await User.findById(req.user._id).populate('roles')

                
                return res.status(200).json({
                    authenticatedUser : user ,
                    isAuthenticated : req.isAuthenticated(),
                    success : true 
                })
            }

            return res.status(200).json({
                authenticatedUser : undefined ,
                isAuthenticated : false,
                success : false
            })


        } catch (err) {
            console.log(err);
            res.json({
                message : err,
                success : false 
            })
            next();
        }
    }

    async panel(req , res , next){
        try {
            const id = req?.user?.id
            this.isMongoId(id)

            let query = req.query

            let sort = this.sortManager(query)
            let createdAt =  this.timeMaker(req)

            const user = await User.findById(id).select('-password -apitoken -remembertoken -admintoken -oathtoken -reports')
            .populate({path : 'articles' ,  select : '-summary -images' , options : {sort : {createdAt : 'desc'} , limit : req.query.limit || 10 , skip : req.query.skip  || 0 } , match : {createdAt : {"$gte" : createdAt }}
            , populate : [{path : 'author' , select : 'username avatar avatarpath'},{path : 'categories' , select : 'name slug'}]
            })
            .populate('articlesCount')
            .populate({path : 'podcasts' ,  select : '-summary -images' , options : {sort : {createdAt : 'desc'} , limit : req.query.limit || 10 , skip : req.query.skip  || 0 } , match : {createdAt : {"$gte" : createdAt }}
            , populate : [{path : 'user' , select : 'username avatar avatarpath'},{path : 'categories' , select : 'name slug'}]
            })
            .populate('podcastsCount')
            .populate({path : 'posts' ,  select : '-summary -images' , options : {sort : {createdAt : 'desc'} } , match : {createdAt : {"$gte" : createdAt }} 
            , populate : [{path : 'user' , select : 'username avatar avatarpath'},{path : 'tags' , select : 'name slug'}]
            })
            .populate('postsCount')

            .populate({path : 'answers' , options :{ sort : {createdAt : 'desc'} } , populate : [{path : 'user' , select : 'username fullname avatar avatarpath profossional' } ,{path : 'post' , select : 'title slug' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} }  ]})
            .populate('answersCount')
            .populate('bestAnswersCount')
 
            .populate({path : 'comments' , options : {sort : {createdAt : 'desc'}} , populate : [{path : 'user' , select : 'username fullname avatar avatarpath profossional' } ,{path : 'media' , select : 'title slug' } ,{path : 'article' , select : 'title slug' } , {path : 'podcast' , select : 'title slug' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} } ] })
            .populate('commentsCount')

            .populate({path : 'saves' 
            , populate :[
            { path : 'article' , select : '-summary -statement -images -thumb' , populate : [{path : 'author' , select : 'username avatar avatarpath' } , {path : 'categories tags' , select : 'name slug'}]} 
            , {path : 'podcast' , select : '-summary -statement -images -thumb -sound -soundpath' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'categories tags' , select : 'name slug'}] } 
            , {path : 'post' , select : '-summary -statement -images -thumb -sound -soundpath' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'tags' , select : 'name slug'}] } 
            ]})

            .populate({path : 'likes' 
            , populate :[
            { path : 'article' , select : '-summary -statement -images -thumb' , populate : [{path : 'author' , select : 'username avatar avatarpath' } , {path : 'categories tags' , select : 'name slug'}]} 
            , {path : 'podcast' , select : '-summary -statement -images -thumb -sound -soundpath' , populate : [{path : 'user' , select : 'username avatar avatarpath' } , {path : 'categories tags' , select : 'name slug'}] } 
            , {path : 'comment'  ,  populate : [{path : 'user' , select : 'username fullname avatar avatarpath profossional' } ,{path : 'media' , select : 'title slug' } ,{path : 'article' , select : 'title slug' } , {path : 'podcast' , select : 'title slug' } , {path : 'parent' , select : 'title user' , populate : {path : 'user' , select : 'username'} } ]        } 
            ]})

            .populate({path : 'followings' , select : 'username avatar avatarpath profossional fullname about followedByThisUser'})
            .populate({path : 'roles' , select : '-permissions'})


            .populate({path : 'tags', populate : [
                {path : 'posts' ,  select : '_id'},
                {path : 'articles' ,  select : '_id'},
                {path : 'podcasts' ,  select : '_id'}
            ]})            

            const tags = await Tag.find({})

            this.checkUserLikdeAndSavedArticles(req , user.articles)
            this.checkUserLikdeAndSavedPodcasts(req , user.podcasts)
            this.checkUserSavedPosts(req , user.posts)
            this.checkUserLikdedComments(req , user.comments)
            this.checkUserFollowedUsers(req , user.followings , null)

            return res.status(200).json({
                user,
                authenticatedUser : req.user,
                isAuthenticated : req.isAuthenticated(),
                tags,
                success : true 
            })

        } catch (err) {
            console.log(err);
            next();
        }
    }

    async dashboard(req , res , next){
        try {
            let query = req.query
            let id = req.params.id

            let sort = this.sortManager(query)
            let createdAt =  this.timeMaker(req)


            let user = await User.findById(id).select('-password -apitoken -remembertoken -admintoken -oathtoken -reports')
            .populate({path : 'articles' ,  select : '-summary -images' , options : {sort : {createdAt : 'desc'} , limit : req.query.limit || 10 , skip : req.query.skip  || 0 } , match : {createdAt : {"$gte" : createdAt }}
            , populate : [{path : 'author' , select : 'username avatar avatarpath'},{path : 'categories' , select : 'name slug'}]
            })
            .populate('articlesCount')
            .populate({path : 'posts' ,  select : '-summary -images' , options : {sort : {createdAt : 'desc'} } , match : {createdAt : {"$gte" : createdAt }} 
            , populate : [{path : 'user' , select : 'username avatar avatarpath'},{path : 'tags' , select : 'name slug'}]
            })
            .populate('postsCount')
            .populate('podcasts')
            .populate('podcastsCount')
            .populate('answers')
            .populate('answersCount')
            .populate('bestAnswersCount')
            .populate({path : 'tags',  populate : 'articlesCount podcastsCount postsCount'})
            .populate({path : 'roles' , select : '-prermissions'})

            this.checkUserLikdeAndSavedArticles(req , user.articles)
            this.checkUserSavedPosts(req , user.posts)
            this.checkUserFollowedUsers(req , null , user)
            this.checkUserFollowedTags(req , user.tags )


            return res.status(200).json({
                user,
                isAuthenticated : req.isAuthenticated(),
                authenticatedUser : req.user,
                success : true
            })


        } catch (error) {
            console.log(error)
            res.status(500).json({
                message : error,
                success : false
            })
            next();
        }
    }

    async uploadAvatar(req , res , next){
        try {

            let images = this.imageResize(req.file)
            const user = await User.findByIdAndUpdate(req.user._id , {$set : {
                avatar : images[480]
            }})

            // return res.redirect('/user/panel')
            return res.json({
                data : user,
                succes : true
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    
    async updateInfo(req , res , next){
        try {

            const result = await this.validationData(req , res)
            // console.log(result)
            if(! result){
                return res.json({
                    messages :  req.flash('validationMessage'),
                    succes : false
                })
            }


            console.log(req.body)
            // const birthDate2 = (req.body.yyyy)-621 + '/' +  req.body.mm.toLocaleString('fa' , 'IR') + '/' + req.body.dd.toLocaleString('fa' , 'IR')
            // console.log(birthDate2)
            // return;
            const user = await User.findByIdAndUpdate(req.user._id , {$set : {
                avatar : req.body.avatar,
                avatarpath : req.body.avatarpath,

                username : req.body.username,
                email : req.body.email,
                fullname : req.body.fullname ,

                birthDate : req.body.birthDate === 'null' ? null : req.body.birthDate,
                profossional : req.body.profossional === 'null' ? null : req.body.profossional,
                about : req.body.about === 'null' ? null : req.body.about ,

                website : req.body.website === 'null' ? null : req.body.website,
                github : req.body.github === 'null' ? null : req.body.github,
                linkedin : req.body.linkedin === 'null' ? null : req.body.linkedin,
                telegram : req.body.telegram === 'null' ? null : req.body.telegram,
                instagram : req.body.instagram === 'null' ? null : req.body.instagram,
                twitter : req.body.twitter === 'null' ? null : req.body.twitter,



            }})

            return res.json({
                data : user,
                success : true
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async passwordForm(req , res , next){
        try {
            const id = req.user.id
            this.isMongoId(id)
            const user = await User.findById(id).select('_id username email fullName address idcardNumber birthDate createdAt updatedAt shopped vipType vipTime avatar avatarpath')
    
            res.render('home/userPanel/password' , { user  , valid : false})

        } catch (err) {
            console.log(err);
            next(err);
        }

    }

    async passwordManger(req , res , next){
        try {

            const result = await this.validationData(req , res)
            // console.log(result)
            if(! result){
                return res.redirect('/user/password')
            }

            const user = await User.findById(req.user._id)

            if(! user){
                req.flash('validationMessage' , 'چنین کاربری وجود ندارد، لطفا دوباره وارد شوید')
                return  res.redirect('/user/password')
            }

            if(! user.comparePassword(req.body.password)){
                req.flash('validationMessage' , 'اطلاعات وارد شده صحیح نیست، لطفا دوباره تلاش بفرمائید')
                return  res.redirect('/user/password')

            }

            res.render('home/userPanel/password' , { user , valid : true })
            
        } catch (err) {
            console.log()
            next(err);
        }
    }

    async passwordChanger(req , res , next){
        try {

            const user = await User.findById(req.user._id)

            if(! user){
                req.flash('validationMessage' , 'چنین کاربری وجود ندارد، لطفا دوباره وارد شوید')
                return  res.redirect('/user/password')
            }

            const result = await this.validationData(req , res)
            console.log(result)
            if(! result){
                // req.flash('valid' , )
                return  res.render('home/userPanel/password' , { user , valid : true })

            }
            
            
            // const hashedPassword = await  user.hashPassword(req.body.newPassword)

            // console.log(hashedPassword)

            await user.$set('password' , user.hashPassword(req.body.newPassword))

            await user.save();

            // const updatedUser = await user.update({ $set : { 
            //     password : hashedPassword
            // }})

            // console.log(updatedUser)


            req.flash('validationMessage' , 'تغییر اطلاعات با موفقیت انجام شد')
            res.redirect('/user/password')
            



        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async phoneNumberForm(req , res , next){
        try {
            const id = req.user.id
            this.isMongoId(id)
            const user = await User.findById(id).select('_id username email fullName address idcardNumber birthDate createdAt updatedAt shopped vipType vipTime avatar avatarpath')
            
            
            res.render('home/userPanel/phoneNumber' , { user })

        } catch (err) {
            console.log(err);
            next(err);
        }

    }

    async activeByPhoneNumber( req , res , next){
        try {   
            console.log(req.body.phonenumber)

            // client.autoSendCode('09367449229' , "Signiture Footer For Branding")
            // .then( (messageId)=>{
            //     console.log("message ID is :" , messageId)

            // })
            // .catch(err => console.log(err))

                        
            // client.manualSendCode("09301234567", "Verification Code: 595783 \nTrez WebService SMS")
            // .then((messageId) => {
            //     console.log("Sent Message ID: " + messageId);
            // })
            // .catch(error => console.log(error));


            
            res.redirect('/user/phoneNumber')

            // client.checkCode("09301234567", "595783")
            // .then((isValid) => {
            //     if (isValid) {
            //         console.log("Code 595783 for this number 09301234567 is valid and verified.");
            //     }
            //     else {
            //         console.log("Provided code for that number is not valid!");
            //     }
            // })
            // .catch(error => console.log(error));
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    async deviceManager(req , res , next){
        try {
            
            

        } catch (err) {
            console.log(err)
            next(err);
        }
    }

    async followUser(req , res , next){
        try {

            console.log(req.body)
            // console.log(req.parmas.id)
            console.log('follow')

            const otherUserId = req.body.id
            const authenticatedUserId = req.user._id

            await User.findByIdAndUpdate(authenticatedUserId , {
                $push : {
                    followings : otherUserId,
                } , 
                $inc : {
                    followingsCount : 1
                } , 
            })


            await User.findByIdAndUpdate(otherUserId , {
                $push : {
                    followers : authenticatedUserId,
                } , 
                $inc : {
                    followersCount : 1
                } , 
                $set : {
                    followedByThisUser : true
                }
            })

            
            const user = await User.findById(otherUserId)

            const authenticatedUser = await User.findById(authenticatedUserId).select('-password -apitoken -remembertoken -admintoken -oathtoken -reports')
            .populate({path : 'followings' , select : 'username avatar avatarpath profossional fullname about followedByThisUser'})


            return res.json({
                user,
                userFollowings : authenticatedUser.followings,
                success : true
            })
            
        } catch (err) {
            console.log(err)
            res.json({
                messages : err ,
                code : 500,
                success : false
            })
            next()
        }
    }

    async unFollowUser(req , res , next){
        try {
            console.log(req.body)
            // console.log(req.parmas.id)
            console.log('unfollow')
            
            const otherUserId = req.body.id
            const authenticatedUserId = req.user._id

            await User.findByIdAndUpdate(authenticatedUserId , {
                $pull : {
                    followings : otherUserId,
                } , 
                $inc : {
                    followingsCount : -1
                } , 
            })


            await User.findByIdAndUpdate(otherUserId , {
                $pull : {
                    followers : authenticatedUserId,
                } , 
                $inc : {
                    followersCount : -1
                } , 
                $set : {
                    followedByThisUser : false
                }
            })

            const user = await User.findById(otherUserId)

            const authenticatedUser = await User.findById(authenticatedUserId).select('-password -apitoken -remembertoken -admintoken -oathtoken -reports')
            .populate({path : 'followings' , select : 'username avatar avatarpath profossional fullname about followedByThisUser'})

            return res.json({
                user,
                userFollowings : authenticatedUser.followings,
                success : true
            })
            
        } catch (err) {
            console.log(err)
            res.json({
                messages : err ,
                code : 500,
                success : false
            })
            next()
        }
    }


}



module.exports = new userController();