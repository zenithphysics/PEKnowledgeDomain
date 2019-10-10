const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  role: {
    type: String,
    default: "academic"
  },
  accessRights: [String] // accessRights:["right_1","right_2".....]
});

const ADMIN = mongoose.model("adminschema", adminSchema);
module.exports = { model: ADMIN, schema: adminSchema };
