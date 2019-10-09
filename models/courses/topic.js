const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//here we need to import Knowledge Domain Schema object for type Array

const TopicSchema = new Schema({
  chapterId: {
    type: String 
  },
  topicTitle: {
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

const Topic = mongoose.model("topic", TopicSchema);

module.exports = { model: Topic, schema: TopicSchema };
