const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate  = require('mongoose-paginate-v2');


const tagSchema =   Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User'},
    name : {type : String , required : true},
    slug : {type : String , required : true},
    explain : {type : String , default : null},
    followers : [{type : Schema.Types.ObjectId , ref : 'User'}],
    followersCount : {type : Number , default : 0},
    followedByThisUser : {type : Boolean , default : false}
},{timestamps : true , toJSON : { virtuals : true}})

tagSchema.plugin(mongoosePaginate);

tagSchema.methods.path = function(){
    return `/tags/${this.slug}`
}

// tagSchema.virtual('followersCount' , {
//     ref : 'User',
//     localField : '_id',
//     foreignField : 'tags',
//     count : true
// })

tagSchema.virtual('articlesCount' , {
    ref : 'Article',
    localField : '_id',
    foreignField : 'tags',
    count : true
})

tagSchema.virtual('podcastsCount' , {
    ref : 'Podcast',
    localField : '_id',
    foreignField : 'tags',
    count : true
})

tagSchema.virtual('postsCount' , {
    ref : 'Post',
    localField : '_id',
    foreignField : 'tags',
    count : true
})



tagSchema.virtual('posts' , {
    ref : 'Post',
    localField : '_id',
    foreignField : 'tags'
})

tagSchema.virtual('podcasts' , {
    ref : 'Podcast',
    localField : '_id',
    foreignField : 'tags'
})

tagSchema.virtual('articles' , {
    ref : 'Article',
    localField : '_id',
    foreignField : 'tags'
})

module.exports = mongoose.model('Tag' , tagSchema)