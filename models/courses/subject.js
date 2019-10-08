const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapterSchema = require("../kdchapter").schema;

const SubjectSchema = new Schema({
  courseId: {
    type: String
  },
  Title: {
    type: String
  },
  Description: {
    type: String
  },
  Chapters: [chapterSchema]
});

const Subject = mongoose.model("subject", SubjectSchema);

module.exports = { model: Subject, schema: SubjectSchema };
