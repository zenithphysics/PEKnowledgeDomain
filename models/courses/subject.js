const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    courseId:{
        type: String
    },
    Title: {
        type: String
    },
    Description: {
        type: String
    },
    Chapters: {
        type: Array
    }
});

module.exports = Subject = mongoose.model("subject", SubjectSchema);
