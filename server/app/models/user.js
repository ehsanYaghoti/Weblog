const mongoose = require('mongoose');
const Schema = mongoose.Schema
const uniqueString = require('unique-string');
const bcrypt = require('bcryptjs');
const mongoosePaginate  = require('mongoose-paginate-v2');
const JWT = require('jsonwebtoken');
const config = require('./../../config');

const userSchema =  Schema({
    username : {type : String , required : true},
    email : {type : String , required : true},
    password  :  {type : String , required : true},
    fullname :  {type : String , default : ''},
    birthDate :  {type : String , default : ''},

    avatar :  {type : String , default : null},
    avatarpath: {type : String , default : null},
    admin : {type : Boolean , default : false},
    roles : [{ type : Schema.Types.ObjectId , ref : 'Role' }],

    followers : [{type : Schema.Types.ObjectId , ref : 'User'}],
    followings : [{type : Schema.Types.ObjectId , ref : 'User'}], 
    followersCount : {type : Number , default : 0},
    followingsCount : {type : Number , default : 0},

    followedByThisUser : {type : Boolean , default : false},

    profossional :  {type : String , default : ''},
    about :  {type : String , default : ''},
    phoneNumber :  {type : String , default : null},

    remembertoken :  {type : String , default : null},
    admintoken :  {type : String , default : null},
    apitoken :  {type : String , default : null},
    oathtoken :  {type : String , default : null},

    reports : [{type : Schema.Types.ObjectId , ref : 'Report'}],

    website :  {type : String , default : null},
    github :  {type : String , default : null},
    linkedin :  {type : String , default : null},
    telegram :  {type : String , default : null},
    instagram :  {type : String , default : null},
    twitter :  {type : String , default : null},

},{timestamps : true , toJSON : { virtuals : true} })

userSchema.plugin(mongoosePaginate);

userSchema.virtual('articles' , {
    ref : 'Article',
    localField : '_id',
    foreignField : 'author'
})

userSchema.virtual('articlesCount' , {
    ref : 'Article',
    localField : '_id',
    foreignField : 'author',
    count : true
})

userSchema.virtual('podcasts' , {
    ref : 'Podcast',
    localField : '_id',
    foreignField : 'user'
})

userSchema.virtual('podcastsCount' , {
    ref : 'Podcast',
    localField : '_id',
    foreignField : 'user',
    count : true
})

userSchema.virtual('posts' , {
    ref : 'Post',
    localField : '_id',
    foreignField : 'user'
})

userSchema.virtual('postsCount' , {
    ref : 'Post',
    localField : '_id',
    foreignField : 'user',
    count : true
})

userSchema.virtual('answers' , {
    ref : 'Answer',
    localField : '_id',
    foreignField : 'user'
})


userSchema.virtual('answersCount' , {
    ref : 'Answer',
    localField : '_id',
    foreignField : 'user',
    count : true
})

userSchema.virtual('bestAnswersCount' , {
    ref : 'Answer',
    localField : '_id',
    foreignField : 'user',
    match : {bestAnswer : true},
    count : true
})

userSchema.virtual('comments' , {
    ref : 'Comment',
    localField : '_id',
    foreignField : 'user'
})


userSchema.virtual('commentsCount' , {
    ref : 'Comment',
    localField : '_id',
    foreignField : 'user',
    count : true
})


userSchema.virtual('tags' , {
    ref : 'Tag',
    localField : '_id',
    foreignField : 'followers'
})

userSchema.virtual('likes' , {
    ref : 'Like',
    localField : '_id',
    foreignField : 'user'
})

userSchema.virtual('saves' , {
    ref : 'Save',
    localField : '_id',
    foreignField : 'user'
})


userSchema.methods.setRememberToken = async function(res , days = 90) {
    const token = uniqueString();
    res.cookie('remember_token' , token , { maxAge : 1000 * 60 * 60 * 24 * days , signed : true});
    await this.updateOne({remembertoken : token}).catch((err)=>{
        if(err){console.log(err);}
    }) 
}

userSchema.methods.setOatuhToken = async function(res , days = 90) {
    const token = uniqueString();
    res.cookie('oath_token' , token , { maxAge : 1000 * 60 * 60 * 24 * days , signed : true});
    await this.updateOne({oathtoken : token}).catch((err)=>{
        if(err){console.log(err);}
    }) 
}

userSchema.methods.setApiToken = async function(res , days = 30) {

    const token  = JWT.sign({id : this._id} , config.jsonwebtoken.secret_key , { expiresIn : '180d'})
    res.cookie('api_token' , token , {sameSite : false , maxAge : 1000 * 60 * 60 * 24 * 30 * days , path : '/' , httpOnly : true , signed : true})
    
    await this.updateOne({apitoken : token}).catch((err)=>{
        if(err){console.log(err);}
    }) 
    
}


userSchema.methods.hashPassword = function (password) {
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(password , salt);
    return hash;
} 


userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password  , this.password)
}


module.exports = mongoose.model('User' , userSchema)