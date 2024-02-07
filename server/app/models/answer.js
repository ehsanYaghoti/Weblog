const mongoose = require('mongoose');
const Schema = mongoose.Schema
const mongoosePaginate  = require('mongoose-paginate-v2');

const answerSchema =  Schema({
    title : {type : String , default : null},
    user : {type : Schema.Types.ObjectId , ref : 'User'},
    post : {type : Schema.Types.ObjectId , ref : 'Post'},
    approved : {type : Boolean , default : true},
    statement : {type : String , required : true},
    bestAnswer : {type : Boolean , default : false},
    parent : {type : Schema.Types.ObjectId , ref : 'Answer' , default : null},
    reported : {type : Boolean , default : false},
    reports :  [{type : Schema.Types.ObjectId , ref : 'Report'}],
    score : {type : Number , default : 0}
},{timestamps : true  , toJSON : { virtuals : true}  })

answerSchema.virtual('answers' , {
    ref : 'Answer',
    localField : '_id',
    foreignField : 'parent'
});

answerSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Answer' , answerSchema)