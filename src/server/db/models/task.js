const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Sub-schema para os arquivos associados a uma tarefa
const FileSchema = new Schema({
    filename: { type: String, required: true },
    fileType: { type: String, required: true },
    filePath: { type: String, required: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true } 
    
});


const ReminderSchema = new Schema({
    reminderDate: { type: Date, required: true },
    reminderMessage: { type: String },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true } 
  
});

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    createdOn: { type: Date, default: Date.now },
    done: { type: Boolean, default: false },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' }, 
    files: [FileSchema],
    reminders: [ReminderSchema] 
});

module.exports = mongoose.model('Task', TaskSchema);
