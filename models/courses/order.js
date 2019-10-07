const mongoose = require('mongoose');

var order_schema = new mongoose.Schema({
    studentId: String,
    courseId: String,
    subjectIds: [String],
    createdOn: Date,
    status: String,
    price: Number,
    discountCoupon: String
});
var order = mongoose.model('order', order_schema);
module.exports = order;