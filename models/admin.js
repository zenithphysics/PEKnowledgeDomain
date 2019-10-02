const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String
    }
})

const ADMIN = mongoose.model('adminschema' , adminSchema)
module.exports = ADMIN