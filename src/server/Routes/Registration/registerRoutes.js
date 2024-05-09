const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const validateUserRegistration = require('./registration.js');

// Use body-parser middleware here
router.use(bodyParser.json());

// Now define your routes
router.post('/user', validateUserRegistration);

// Export the route object
module.exports = router;
