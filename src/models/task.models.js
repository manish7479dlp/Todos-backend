const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todos"
    }
  },
  { timeseries: true }
);

const Task = mongoose.model("Task" , taskSchema);

module.exports = Task;