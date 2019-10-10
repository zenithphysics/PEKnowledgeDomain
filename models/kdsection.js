const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//here we need to add section type schema

const sectionTypeSchema = new Schema({
  videos: [
    new Schema({
      id: {
        type: Schema.Types.ObjectId
      },
      link: { type: String }
    })
  ],
  theory_img: [
    new Schema({
      id: {
        type: Schema.Types.ObjectId
      },
      img_path: { light: "", dark: "" }
    })
  ],
  theory_richtext: [
    new Schema({
      id: {
        type: Schema.Types.ObjectId
      },
      text_data: { type: String }
    })
  ],
  quiz: [
    {
      questionsimg: { light: String, dark: String },
      answerimg: { light: String, dark: String },
      videoSolutionURL: {},
      answerkey: String
    }
  ], // need to be discuss
  assignment: [
    {
      questionsimg: { light: "", dark: "" },
      answerimg: { light: "", dark: "" },
      videoSolutionURL: {}
    }
  ]
});

const kdSectionSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId
  },
  section_title: {
    type: String
  },
  section_type: sectionTypeSchema,
  topic_title: {
    type: String
  }
});

const KDSECTION = mongoose.model("kdsection", kdSectionSchema);

module.exports = { model: KDSECTION, schema: kdSectionSchema };
