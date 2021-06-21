const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'please insert a task'],
  },
  isArchieved: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("task", taskSchema);