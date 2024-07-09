const bcrypt = require('bcrypt');
const User = require('../db/models/user');
const tokenActions = require('../services/tokenService');
const { validateEmailFormat, validatePasswordFormat } = require('../services/credentialsFormatValidation');

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !validateEmailFormat(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!validatePasswordFormat(password)) {
    return res.status(400).json({ error: 'Invalid password format' });
  }

  if (await User.findOne({ email })) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ email, password: hashedPassword });

  try {
    await newUser.save();
    const token = tokenActions.createToken(newUser._id, email, newUser.roles);
    res.cookie('jwtToken', token, { domain: 'localhost', path: '/', httpOnly: true });
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  const token = req.cookies.jwtToken;
  const { valid, decoded, error } = tokenActions.verifyToken(token);

  if (!valid) {
    return res.status(401).json({ message: error || 'Invalid Token' });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(decoded.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, deleteUser };
