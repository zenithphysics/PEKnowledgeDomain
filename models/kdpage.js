const mongoose = require('mongoose')
const Schema = mongoose.Schema

const kdPageSchema = new Schema({
    id:{
        type: Schema.Types.ObjectId
    },
    sections:{
        type:Array
    },
    topic_id:{
        type: int
    }
})

const KDPAGE = mongoose.model('kdtopic' , kdPageSchema)

module.exports = KDPAGE