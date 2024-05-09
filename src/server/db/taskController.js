const mongoose = require('mongoose');
const TaskSchema = require('./models/task.js');
const Task = mongoose.model('Task', TaskSchema);

const TaskController = {
  createTask: async (taskData) => {
    const task = new Task(taskData);
    await task.save();
  },

  getAllTasks: async () => {
    const tasks = await Task.find({});
    return tasks;
  },

  getTask: async (taskId) => {
    const task = await Task.findById(taskId);
    return task;
  },

  updateTask: async (taskId, updatedTaskData) => {
    const task = await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true });
    return task;
  },

  deleteTask: async (taskId) => {
    await Task.findByIdAndRemove(taskId);
  },
};

module.exports = TaskController;
