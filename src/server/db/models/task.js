const mongoose = require('mongoose');

// Sub-schema para os arquivos associados a uma tarefa
const FileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    fileType: { type: String, required: true },
    filePath: { type: String, required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true } 
    
});


const ReminderSchema = new mongoose.Schema({
    reminderDate: { type: Date, required: true },
    reminderMessage: { type: String },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true } 
  
});

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    createdOn: { type: Date, default: Date.now },
    done: { type: Boolean, default: false },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    files: [FileSchema],
    reminders: [ReminderSchema] 
});

module.exports = mongoose.model('Task', TaskSchema);
