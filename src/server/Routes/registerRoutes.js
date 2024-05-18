const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const userActions = require("../controllers/userController");
const cookieParser = require('cookie-parser');

// Use body-parser middleware here
router.use(bodyParser.json());
router.use(cookieParser())

// Now define your routes
router.post('/user', userActions.registerUser);

router.delete('/user',userActions.deleteUser)

// Export the route object
module.exports = router;
