const mongoose = require('mongoose');
const Schema = mongoose.Schema
const mongoosePaginate  = require('mongoose-paginate-v2');

const reportSchema =  Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User'},
    title : {type : String  , required : true },
    slug : {type : String , required : true},
    users : [{type : Schema.Types.ObjectId , ref : 'User'}],
    posts : [{type : Schema.Types.ObjectId , ref : 'Post'}],
    answers : [{type : Schema.Types.ObjectId , ref : 'Answer'}],
    authors : [{type : Schema.Types.ObjectId , ref : 'User'}],
},{timestamps : true  , toJSon : {virtuals  : true} })

reportSchema.plugin(mongoosePaginate);

// reportSchema.virtual('users' , {
//     ref : 'User',
//     localField : '_id',
//     foreignField : 'reports'
// })


// reportSchema.virtual('posts' , {
//     ref : 'Post',
//     localField : '_id',
//     foreignField : 'reports'
// })

// reportSchema.virtual('answers' , {
//     ref : 'Answer',
//     localField : '_id',
//     foreignField : 'reports'
// })


module.exports = mongoose.model('Report' , reportSchema)