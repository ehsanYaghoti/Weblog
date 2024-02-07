const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate  = require('mongoose-paginate-v2');

const permissionSchema =  Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User'},
    name : {type : String , required : true},
    label : {type : String , required : true},
},{timestamps : true })

permissionSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Permission' , permissionSchema)