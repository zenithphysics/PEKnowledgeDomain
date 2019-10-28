const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kdPageSchema = require("./kdpage").schema;

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
  pages: [kdPageSchema]
});

const KDTOPIC = mongoose.model("kdtopic", kdTopicSchema);

module.exports = { model: KDTOPIC, schema: kdTopicSchema };
