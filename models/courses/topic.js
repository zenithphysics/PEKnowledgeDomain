const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//here we need to import Knowledge Domain Schema object for type Array

const TopicSchema = new Schema({
  chapterId: {
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
