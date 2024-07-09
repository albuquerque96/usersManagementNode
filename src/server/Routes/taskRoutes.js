const express = require('express');
const { createTask, getAllTasks, getTask, updateTask, deleteTask } = require('../controllers/taskController');
const tokenActions = require("../controllers/tokenController");
const router = express.Router();
const app = express()
const bodyParser = require('body-parser');
 app.use(bodyParser.json());
const validateUserToken =async  (req, res, next) => {
    const token = req.cookies.jwtToken;
    const isValidToken = await tokenActions.verifyToken(token);
    if(isValidToken!==true) {
        return res.status(401).json({ message: isValidToken.error || 'Invalid Token' });
       } 
    next();
}

 router.post('/task',validateUserToken , createTask);
 router.get('/tasks',validateUserToken , getAllTasks);
 router.get('/tasks/:id',validateUserToken , getTask);
 router.put('/tasks/:id', validateUserToken, updateTask);
 router.delete('/tasks/:id', validateUserToken, deleteTask);

module.exports = router;

