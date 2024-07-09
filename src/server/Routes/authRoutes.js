const express = require('express');
const router = express.Router();
const { verifyCredentials, logoutUser } = require('../controllers/authController');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

router.use(bodyParser.json());
router.use(cookieParser());

router.post('/login', verifyCredentials);
router.post('/logout', logoutUser);

module.exports = router;
