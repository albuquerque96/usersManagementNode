const bcrypt = require('bcrypt');
const User = require('../db/models/user');
const tokenActions = require('..//services/tokenService');
const { validateEmailFormat, validatePasswordFormat } = require('../services/credentialsFormatValidation');

const verifyCredentials = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed: user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Authentication failed: incorrect password" });
    }

    const token = tokenActions.createToken(user._id, email, user.roles);
    res.cookie('jwtToken', token, { domain: 'localhost', path: '/', httpOnly: true });
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('jwtToken', { domain: 'localhost', path: '/' });
  return res.status(200).json({ message: 'Logged out successfully!' });
};

module.exports = { verifyCredentials, logoutUser };
