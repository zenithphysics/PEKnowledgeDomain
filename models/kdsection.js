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
      img_link: { type: String }
    })
  ],
  theory_text: [
    new Schema({
      id: {
        type: Schema.Types.ObjectId
      },
      text_data: { type: String }
    })
  ],
  quiz: [], // need to be discuss
  assignment: []
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
