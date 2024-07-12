const express = require('express');
const router = express.Router();
const { loginUser, logoutUser } = require('../controllers/authController');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

router.use(bodyParser.json());
router.use(cookieParser());

router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
