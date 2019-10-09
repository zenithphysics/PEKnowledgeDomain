const mongoose = require("mongoose");

const order_schema = new mongoose.Schema({
  studentId: String,
  courseId: String,
  subjectIds: [String],
  createdOn: Date,
  status: String,
  price: Number,
  discountCoupon: String
});
const order = mongoose.model("order", order_schema);
module.exports = { model: order, schema: order_schema };
