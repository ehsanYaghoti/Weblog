const mongoose = require('mongoose');
const Schema = mongoose.Schema
const mongoosePaginate  = require('mongoose-paginate-v2');

const articleSchema =  Schema({
    title : {type : String , required : true},
    slug : {type : String , required : true},
    author : {type : Schema.Types.ObjectId , ref : 'User'},
    statement : {type : String , required : true , default : ''},
    summary : {type : String , required : true},
    image : {type : String , required : true},
    images : {type : Object , required : true},
    thumb : {type : String , required : true },
    imagepath: {type : String ,  required : true , default : null},
    readingtime :  {type : String , default : '0'},
    tags : [{type : Schema.Types.ObjectId , ref : 'Tag'}],
    categories : [{type : Schema.Types.ObjectId , ref : 'Category'}],
    source :   {type : String , default : ''},
    language :   {type : String , default : 'en'},
    viewCount : { type : Number , default : 0 },
    commentCount : { type : Number , default : 0 },
    saveCount : { type : Number , default : 0 },
    likeCount : { type : Number , default : 0 },
    likedByThisUser : { type : Boolean , default : false },
    savedByThisUser : { type : Boolean , default : false },
    rating :   {type : Number , default : 0},
},{timestamps : true   , toJSON : { virtuals : true} })

articleSchema.plugin(mongoosePaginate);

articleSchema.virtual('comments' , {
    ref : 'Comment',
    localField : '_id',
    foreignField : 'article'
})

articleSchema.virtual('likes' , {
    ref : 'Like',
    localField : '_id',
    foreignField : 'article'
})

articleSchema.virtual('saves' , {
    ref : 'Save',
    localField : '_id',
    foreignField : 'article'
})

articleSchema.methods.path = function(){
    return `/articles/${this.slug}`
}


module.exports = mongoose.model('Article' , articleSchema)