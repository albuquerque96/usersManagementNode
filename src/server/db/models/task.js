const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  createdOn: { type: Date, default: Date.now() },
  done: { type: Boolean, default: false },
  asignedTo:{}
});
module.exports = TaskSchema