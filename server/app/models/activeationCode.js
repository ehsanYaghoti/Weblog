const mongoose = require('mongoose')
const Schema = mongoose.Schema

const activeationCodeSchema = Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User'},
    code : {type : String , required : true},
    use : {type : Boolean , default : false},
    expire : {type : Date , required : true}
},{timestamps : true })

module.exports = mongoose.model('ActiveationCode' , activeationCodeSchema)