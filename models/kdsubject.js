const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kdChapterSchema = require("./kdchapter").schema;

const kdSubjectSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId
  },
  subject_title: {
    type: String
  },
  description: {
    type: String
  },
  chapters: [kdChapterSchema]
});

const KDSUBJECT = mongoose.model("kdsubject", kdSubjectSchema);

module.exports = { model: KDSUBJECT, schema: kdSubjectSchema };
