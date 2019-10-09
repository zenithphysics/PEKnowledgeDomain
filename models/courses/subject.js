const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const SubjectSchema = new Schema({
  courseId: {
    type: String
  },
  SubjectTitle: {
    type: String
  },
  Description: {
    type: String
  },
  Chapters: {
    type: Array
  },
  CourseTitle:{
    type:String
  }
});

const Subject = mongoose.model("subject", SubjectSchema);

module.exports = { model: Subject, schema: SubjectSchema };
