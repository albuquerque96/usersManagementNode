const express = require('express');
 const bodyParser = require('body-parser');
const User = require('../../db/models/user.js');
const bcrypt = require('bcrypt');
const credintialsValidation = require('../../validation.js')
const app = express()
 app.use(bodyParser.json());


const validateUserRegistration = async (req, res) => {
 
    const { email, password } = req.body;

    if (!email || email === '') {
      return res.status(400).json({ error: 'Missing email' });
    } else {
      const sanitizedPassword = password.replace(/[^a-zA-Z0-9!@#$%^&*()_+-=|{}[]\\<>\/?.,:\s]/g, '');
      const sanitizedEmail = email.replace(/[^a-zA-Z0-9._@-]/g, '');
      const validEmail = credintialsValidation.validateEmail(sanitizedEmail);
      const validPassword = credintialsValidation.validatePassword(sanitizedPassword);
    
      if (validEmail.length > 0) {
        return res.status(400).json({ error: 'The email format is not correct' });
      }
    
      if (validPassword.length > 0) {
        return res.status(400).json({ error: 'The password format is not correct' });
      }
    
      const existingUser = await User.findOne({ email: sanitizedEmail });
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }
    
      const hashedSalt = await bcrypt.genSalt(10);
      const newUser = new User({
        email: sanitizedEmail,
        password: sanitizedPassword,
        salt: hashedSalt
      });
    
      await newUser.save()
        .then(() => {
          console.log(email + ' was registed successfully!!!');
          const message = 'Registration successful!';
          res.status(200).json({ message });
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ error: error});
        });
    }
}

module.exports = validateUserRegistration;
