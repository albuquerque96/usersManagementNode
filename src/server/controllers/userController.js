const User = require('../db/models/user.js');
const bcrypt = require('bcrypt');
const credintialsValidation = require('../formatValidation.js')
const tokenActions = require('./tokenController.js')
const userActions = {
registerUser:async (req, res) => {
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
        const cookieOptions = {
          domain: 'localhost',
          path: '/',
          httpOnly: true // Deve ser 'httpOnly' em vez de 'HttpOnly'
      };
      
      res.cookie('jwtToken', newUser.token, cookieOptions);
      
  
        // Return success message
        res.status(201).json({ message: 'User created successfully!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
      }
    }
  },

 updateUser: () =>{
    
},

readUser : () =>{
    
},
deleteUser : async (req,res) =>{
/*
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  */

  const token = req.cookies.jwtToken;
  const isValidToken = await tokenActions.verifyToken(token);
 if(isValidToken!==true) {
    res.status(300)(isValidToken.message) 
 } 
 else {
   if (req.user.role !== 'admin' && req.user.id !== id) {

  return res.status(403).json({ error: 'Unauthorized' });
}
const user = await User.findById(id);
if (!user) {
  return res.status(404).json({ error: 'User not found' });
}
 
 res.status(200).json({message: "User deleted succesfully!!"})
 }
 


}
}

module.exports = userActions

