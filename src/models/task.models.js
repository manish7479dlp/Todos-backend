const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timeseries: true }
);

const Task = mongoose.model("Task" , taskSchema);

module.exports = Task;