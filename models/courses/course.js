const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = require("../kdsubject").schema;

const CourseSchema = new Schema({
  Title: {
    type: String
  },
  Created_by: {
    type: String
  },
  Description: {
    type: String
  },
  Reviews: {
    type: Array
  },
  Video_link: {
    type: String
  },
  Subjects: [subjectSchema]
});

const Course = mongoose.model("course", CourseSchema);

module.exports = { model: Course, schema: CourseSchema };
