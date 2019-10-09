const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  Topics: {
    type: Array
  },
  subjectTitle:{
    type:String
  }
});

const Chapter = mongoose.model("chapter", chapterSchema);
module.exports = { model: Chapter, schema: chapterSchema };
