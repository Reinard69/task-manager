const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please include user id"],
    },
    taskName: {
      type: String,
      required: [true, "Please enter the task name"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description for the task"],
    },
    status: {
        type: String,
        required: [true, "Please enter the status of the task"],
        enum : ['completed','incomplete', 'in progress'],
    },
    dueDate: {
        type: Date,
        required: [ true, "Please enter the due date for the task"]
    },
    priority: {
        type: String,
        required: [true, "Please enter the priority of the task"],
        enum : ['high','low', 'medium'],
    }
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model('task', taskSchema);

module.exports = Task;