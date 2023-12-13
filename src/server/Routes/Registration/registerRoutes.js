const express = require('express');
const  validateUserRegistration  = require('./registration.js');
const router = express.Router();


// Route handler for user registration
router.post('/register', validateUserRegistration);

// Route handler for displaying the registration form

// Export the route object
module.exports = router;
