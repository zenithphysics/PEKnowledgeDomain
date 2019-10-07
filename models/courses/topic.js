const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
    chapterId:{
        type: String
    },
    Title: {
        type: String
    },
    Description: {
        type: String
    }, 
    learnpage: {
        type: Array
    },
    theorypage: {
        type: Array
    },
    assignmentpage: {
        type: Array
    }
});

module.exports = Topic = mongoose.model("topic", TopicSchema);
