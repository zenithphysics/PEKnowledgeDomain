const mongoose = require('mongoose')
const Schema = mongoose.Schema

const kdSubjectSchema = new Schema({
    id:{
        type: Schema.Types.ObjectId
    },
    title:{
        type:String
    }, 
    description:{
        type:String
    },
    chapters:{
        type:Array
    }

})

const KDSUBJECT = mongoose.model('kdsubject' , kdSubjectSchema)

module.exports = KDSUBJECT