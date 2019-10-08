const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kdTopicSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  topic_title: {
    type: String
  },
  chapter_id: {
    type: String
  },
  pages: {
    type: Array
  }
});

const KDTOPIC = mongoose.model("kdtopic", kdTopicSchema);

module.exports = KDTOPIC;
