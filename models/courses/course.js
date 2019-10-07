const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    Title: {
        type: String
    },
    Created_by: {
        type: String
    },
    Description: {
        type: String
    },
    Reviews: {
        type: Array
    },
    Video_link: {
        type: String
    },
    Subjects: {
        type: Array
    } 
});

module.exports = Course = mongoose.model("course", CourseSchema);