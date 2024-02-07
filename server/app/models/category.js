const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate  = require('mongoose-paginate-v2');


const categorySchema =   Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User' , required : true},
    parent : {type : Schema.Types.ObjectId , ref : 'Category' , default : null},
    name : {type : String , required : true},
    slug : {type : String , required : true},
},{timestamps : true , toJSON : { virtuals : true}})

categorySchema.plugin(mongoosePaginate);

categorySchema.methods.path = function(){
    return `/category/${this.slug}`
}

categorySchema.virtual('childrens' , {
    ref : 'Category',
    localField : '_id',
    foreignField : 'parent',
})

categorySchema.virtual('articles' , {
    ref : 'Article',
    localField : '_id',
    foreignField : 'categories'
})

categorySchema.virtual('podcasts' , {
    ref : 'Podcast',
    localField : '_id',
    foreignField : 'categories'
})



module.exports = mongoose.model('Category' , categorySchema)