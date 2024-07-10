const Task = require('../db/models/task.js');


const TaskController = {
  createTask: async (req,res) => {
    const task = new Task(req.body);
    await task.save();
    return res.status(200).json({ message:'task created successfully'});
  },

  getAllTasks: async (req,res) => {
    
    const token= req.cookies.jwtToken;
    const tasks = await Task.find({aassignedto:token.id})
    return res.status(200).json({ tasks:tasks});
    
  },

  getTask: async (req,res) => {
    const taskid = req.params.id
    const task = await Task.findById(taskid);
    return res.status(200).json({ task:task});
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
