const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../../db/models/user');
const router = express.Router();

const verifyCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }

  const salt = user.salt;
  const hashedPassword = bcrypt.hash(password, salt);

  return hashedPassword === user.password;
};

router.post('/login', verifyCredentials, (req, res) => {
res.redirect('https://google.com')
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/login.html'));
});


module.exports = router;
