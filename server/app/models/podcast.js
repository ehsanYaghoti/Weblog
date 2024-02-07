const mongoose = require('mongoose');
const Schema = mongoose.Schema
const mongoosePaginate  = require('mongoose-paginate-v2');

const podcastSchema =  Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User'},
    title : {type : String , required : true},
    slug : {type : String , required : true},
    statement : {type : String , required : true}, 
    language :   {type : String , default : 'en'},
    number : {type : Number ,default : 0},
    image : {type : String ,  required : true},
    imagepath: {type : String ,  required : true , default : null},
    images : {type : Object , required : true},
    thumb : {type : String , required : true },
    sound : {type : String ,  required : true},
    soundTime : {type : String ,  default : "00:00"},
    soundpath : {type : String ,  required : true , default : null},
    tags : [{type : Schema.Types.ObjectId , ref : 'Tag'}],
    categories : [{type : Schema.Types.ObjectId , ref : 'Category'}],
    viewCount : { type : Number , default : 0 },
    commentCount : { type : Number , default : 0 },
    saveCount : { type : Number , default : 0 },
    likeCount : { type : Number , default : 0 },
    likedByThisUser : { type : Boolean , default : false },
    savedByThisUser : { type : Boolean , default : false },
},{timestamps : true , toJSON : { virtuals : true} })


podcastSchema.plugin(mongoosePaginate);

podcastSchema.virtual('comments' , {
    ref : 'Comment',
    localField : '_id',
    foreignField : 'podcast'
})

podcastSchema.virtual('likes' , {
    ref : 'Like',
    localField : '_id',
    foreignField : 'podcast'
})

podcastSchema.virtual('saves' , {
    ref : 'Save',
    localField : '_id',
    foreignField : 'podcast'
})

podcastSchema.methods.path = function(){
    return `/podcasts/${this.slug}`
}


module.exports = mongoose.model('Podcast' , podcastSchema)