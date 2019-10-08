const mongoose = require('mongoose')
const Schema = mongoose.Schema

const kdchapter = require('./kdchapter');

const kdSubjectSchema = new Schema({
    id:{
        type: Schema.Types.ObjectId
    },
    subject_title:{
        type:String
    }, 
    description:{
        type:String
    },
    chapters:[{kdchapter}]
 
})

const KDSUBJECT = mongoose.model('kdsubject' , kdSubjectSchema)

module.exports = KDSUBJECT