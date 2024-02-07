const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate  = require('mongoose-paginate-v2');

const likeSchema =   Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User'},
    podcast : {type : Schema.Types.ObjectId , ref : 'Podcast' , default : null },
    comment : {type : Schema.Types.ObjectId , ref : 'Comment' , default : null },
    article : {type : Schema.Types.ObjectId , ref : 'Article' , default : null },
},{timestamps : true  ,  toJSON : { virtuals : true} })

likeSchema.plugin(mongoosePaginate)

// const likeBelongsTo = doc => {
//     // console.log(doc)
//     if(doc.article !== null){
//         return 'Article';
//     } else if(doc.podcast  !== null){
//         return 'Podcast';
//     } else if(doc.comment  !== null){
//         return 'Comment';
//     }
// }

// likeSchema.virtual('belongsTo' , {
//     ref : likeBelongsTo(),
//     localField : likeBelongsTo().toLowerCase() ,
//     foreignField : '_id',
//     justOne : true
// })




module.exports = mongoose.model('Like' , likeSchema)