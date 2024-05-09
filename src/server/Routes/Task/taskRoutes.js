const express = require('express');
const { createTask, getAllTasks, getTask, updateTask, deleteTask } = require('./tasks-controller');

const router = express.Router();
const app = express()
const bodyParser = require('body-parser');
 app.use(bodyParser.json());


 app.post('/tasks',validateUser , createTask);
 app.get('/tasks',validateUser , getAllTasks);
 app.get('/tasks/:id',validateUser , getTask);
 app.put('/tasks/:id', validateUser, updateTask);
 app.delete('/tasks/:id', validateUser, deleteTask);
module.exports = router;

