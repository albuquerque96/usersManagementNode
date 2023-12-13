const express = require('express');
const path = require('path');
const createDialog = require('react-modal');
const User = require('../../db/models/user.js');
const bcrypt = require('bcrypt');
const credintialsValidation = require('../../validation.js')

// Validation function for user registration
const validateUserRegistration = async (req, res) => {
    try {
        const { email, password } = req.body;

        const sanitizedEmail = email.replace(/[^a-zA-Z0-9\._@-]/g, '');
        const sanitizedPassword = password.replace(/[^a-zA-Z0-9!@#$%^&*()_+-=|{}[]\\<>\/?.,:\s]/g, '');
        const validEmail=credintialsValidation.validateEmail(sanitizedEmail)
        const validPassword=credintialsValidation.validatePassword(sanitizedPassword)
        if (!validEmail) {
            return res.status(400).json({ error: 'the email format is not correct'});
        }
        if (!password) {
            return res.status(400).json({ error: 'the password format is not correct'});
        }
    
        const existingUser = await User.findOne({ email: sanitizedEmail });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        const hashedSalt = await bcrypt.genSalt(10);
        const newUser = new User({
            email: sanitizedEmail,
            password: sanitizedPassword,
            salt:hashedSalt
        });
        console.log(newUser.email + " was registed successfully!!!");
        res.status(200)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Export the validation function
module.exports = validateUserRegistration;
