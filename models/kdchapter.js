const mongoose = require('mongoose')
const Schema = mongoose.Schema


const kdChapterSchema = new Schema({
    id:{
        type: Schema.Types.ObjectId
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    topics:{
        type:Array
    },
    subject_id:{
        type:String
    }

})

const KDCHAPTER = mongoose.model('kdchapter' , kdChapterSchema)

module.exports = KDCHAPTER