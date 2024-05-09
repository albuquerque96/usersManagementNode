const User = require('../../db/models/user.js');
const bcrypt = require('bcrypt');
const credintialsValidation = require('../../formatValidation.js')
const tokenActions = require('../Token/token.js')

const validateUserRegistration = async (req, res) => {
  // Check if the request contains valid data
  const { email, password } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ error: 'Missing email' });
  } else {
    const sanitizedPassword = password.replace(/[^a-zA-Z0-9!@#$%^&*()_+-=|{}[]\\<>\/?.,:\s]/g, '');
    const sanitizedEmail = email.replace(/[^a-zA-Z0-9._@-]/g, '');
    const validEmail = credintialsValidation.validateEmailFormat(sanitizedEmail);
    const validPassword = credintialsValidation.validatePasswordFormat(sanitizedPassword);

    if (!validEmail) {
      return res.status(400).json({ error: 'email format is not correct'});
    }

    if (validPassword.length>0) {
      return res.status(400).json({ error: validPassword });
    }
    if (await User.findOne({ email: req.body.email })) {
      return res.status(400).json({ error: 'email already in use' });
     }
     
    // Generate salt and create new user object
    const salt = await bcrypt.genSalt(10);
    const newUser = new User({
      email: sanitizedEmail,
      password: await bcrypt.hash(sanitizedPassword, salt),
    });

    // Register the new user in the database
    try {
      

      // Generate JWT token        
      newUser.token = await tokenActions.createToken(email,newUser.roles)
      await newUser.save();
      // Set JWT cookie
      const cookie = {
        token: newUser.token,
        HttpOnly: true
      };
      res.cookie('jwtToken', cookie);

      // Return success message
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  }
};




const updateUser = async (req, res) => {
 const { id,email, password } = req.body;
 const user = await User.findById(id);

 if (!user) {
   return res.status(404).json({ error: 'User not found' });
 }

 if (req.user.role !== 'admin' && req.user.id !== id) {
   return res.status(403).json({ error: 'Unauthorized' });
 }

User.findByIdAndUpdate(id,req.body)
}

const deleteUser = async (req, res) => {
 const { id } = req.params;
 const user = await User.findById(id);

 if (!user) {
   return res.status(404).json({ error: 'User not found' });
 }

 if (req.user.role !== 'admin' && req.user.id !== id) {
   return res.status(403).json({ error: 'Unauthorized' });
 }

 User.findByIdAndDelete(id)
}

module.exports=validateUserRegistration

