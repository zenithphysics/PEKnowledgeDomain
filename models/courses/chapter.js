const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = require("../kdtopic").schema;

const chapterSchema = new Schema({
  subjectId: {
    type: String
  },
  Title: {
    type: String
  },
  Description: {
    type: String
  },
  Topics: [topicSchema]
});

const Chapter = mongoose.model("chapter", chapterSchema);
module.exports = { model: Chapter, schema: chapterSchema };
