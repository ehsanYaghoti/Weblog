const mongoose = require('mongoose');
const Schema = mongoose.Schema
const mongoosePaginate  = require('mongoose-paginate-v2');

const postSchema =  Schema({
    title : {type : String , required : true},
    slug : {type : String , required : true},
    user : {type : Schema.Types.ObjectId , ref : 'User'},
    statement : {type : String , required : true , default : ''},
    summary : {type : String , required : true},
    language :   {type : String , default : 'en'},
    tags : [{type : Schema.Types.ObjectId , ref : 'Tag'}],
    viewCount : { type : Number , default : 0 },
    answerCount : { type : Number , default : 0 },
    hasBestAnswer : { type : Boolean , default : false }, 
    saveCount : { type : Number , default : 0 },
    savedByThisUser : { type : Boolean , default : false },
    reported : {type : Boolean , default : false},
    reports :  [{type : Schema.Types.ObjectId , ref : 'Report'}],
},{timestamps : true , toJSON : { virtuals : true} }) 

postSchema.plugin(mongoosePaginate);

postSchema.virtual('answers' , {
    ref : 'Answer',
    localField : '_id',
    foreignField : 'post'
})


postSchema.virtual('saves' , {
    ref : 'Save',
    localField : '_id',
    foreignField : 'post'
})


postSchema.methods.path = function(){
    return `/posts/${this.slug}`
}


module.exports = mongoose.model('Post' , postSchema)