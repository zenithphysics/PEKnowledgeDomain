const mongoose = require('mongoose')
const Schema = mongoose.Schema


const kdChapterSchema = new Schema({
    id:{
        type: Schema.Types.ObjectId
    },
    subject_title:{
        type:String
    },
    chapterTitle:{
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