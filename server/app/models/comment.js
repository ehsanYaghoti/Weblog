const mongoose = require('mongoose');
const Schema = mongoose.Schema
const mongoosePaginate  = require('mongoose-paginate-v2');

const commentSchema =   Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User' },
    article : {type : Schema.Types.ObjectId , ref : 'Article' , default : null},
    podcast : {type : Schema.Types.ObjectId , ref : 'Podcast'  , default : null},
    parent : {type : Schema.Types.ObjectId , ref : 'Comment' , default : null},
    media : { type : Schema.Types.ObjectId , required : true , refPath : 'mediaModel' },
    mediaModel : { type : String , required : true , enum: ['Article', 'Podcast'] } ,
    approved : {type : Boolean , default : false},
    title : {type : String , default : null},
    likeCount : { type : Number , default : 0 },
    likedByThisUser : { type : Boolean , default : false },
    statement : {type : String , required : true},
    score : {type : Number , default : 0}
},{timestamps : true , toJSON : { virtuals : true}})

commentSchema.plugin(mongoosePaginate);

commentSchema.virtual('comments' , {
    ref : 'Comment',
    localField : '_id',
    foreignField : 'parent'
});

commentSchema.virtual('likes' , {
    ref : 'Like',
    localField : '_id',
    foreignField : 'comment'
})

// const commentBelong = doc => {
//     // console.log(doc)
//     if(doc.article){
//         return 'Article';
//     } else if(doc.podcast){
//         return 'Podcast';
//     }
// }

// commentSchema.virtual('belongsTo' , {
//     ref : commentBelong,
//     localField : doc => commentBelong(doc).toLowerCase() ,
//     foreignField : '_id',
//     justOne : true
// })


module.exports = mongoose.model('Comment' , commentSchema)