const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate  = require('mongoose-paginate-v2');

const saveSchema =   Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User'},
    // media : { type : Schema.Types.ObjectId , required : true , refPath : 'mediaModel' },
    // mediaModel : { type : String , required : true , enum: ['Article', 'Podcast' , 'Post'] } ,
    article : {type : Schema.Types.ObjectId , ref : 'Article' , default : null },
    post : {type : Schema.Types.ObjectId , ref : 'Post' , default : null },
    podcast : {type : Schema.Types.ObjectId , ref : 'Podcast' , default : null },
},{timestamps : true })

saveSchema.plugin(mongoosePaginate)

saveSchema.virtual('articles' , {
    ref : 'Article',
    localField : '_id',
    foreignField : 'saves'
})

saveSchema.virtual('podcasts' , {
    ref : 'Podcast',
    localField : '_id',
    foreignField : 'saves'
})

saveSchema.virtual('posts' , {
    ref : 'posts',
    localField : '_id',
    foreignField : 'saves'
})


// const saveBelongTo = doc => {
//     // console.log(doc)
//     if(doc.post !== null){
//         return 'Post';
//     } else if(doc.podcast !== null){
//         return 'Podcast';
//     } else if(doc.article !== null){
//         return 'Article';
//     }
// }

// saveSchema.virtual('belongsTo' , {
//     ref : saveBelongTo(doc),
//     localField : saveBelongTo(doc).toLowerCase() ,
//     foreignField : '_id',
//     justOne : true
// })

module.exports = mongoose.model('Save' , saveSchema)