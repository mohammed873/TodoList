const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  listName: {
    type: String,
    required: [true, 'please insert a task'],
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("list", listSchema);