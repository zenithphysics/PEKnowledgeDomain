const mongoose = require('mongoose')
const Schema = mongoose.Schema

const kdSectionSchema = new Schema({
    id:{
        type: Schema.Types.ObjectId
    },
    title:{
        type:String
    }
})

const KDSECTION = mongoose.model('kdsection' , kdSectionSchema)

module.exports = KDSECTION