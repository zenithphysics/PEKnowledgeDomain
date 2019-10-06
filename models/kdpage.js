const mongoose = require('mongoose')
const Schema = mongoose.Schema

const kdPageSchema = new Schema({
    id:{
        type: Schema.Types.ObjectId
    },
    sections:{
        type:Array
    },
    topic_title:{
     type:String
    },
    topic_id:{
        type: String
    },
    page_type:{
        type:String
    },
    page_title:{
        type:String
    }
})

const KDPAGE = mongoose.model('kdpage' , kdPageSchema)

module.exports = KDPAGE