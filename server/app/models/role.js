const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate  = require('mongoose-paginate-v2');

const roleSchema =   Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User'},
    permissions : [{type : Schema.Types.ObjectId , ref : 'Permission'}],
    name : {type : String , required : true},
    label : {type : String , required : true},
},{timestamps : true })

roleSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Role' , roleSchema)