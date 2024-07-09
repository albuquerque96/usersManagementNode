const express = require('express');
const router = express.Router();
const { registerUser, deleteUser } = require('../controllers/userController');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

router.use(bodyParser.json());
router.use(cookieParser());

router.post('/user', registerUser);
router.delete('/user', deleteUser);

module.exports = router;
