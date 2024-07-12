const tokenActions = require('..//services/tokenService');
const verifyCredentials = require("../services/authService");
const loginUser = async (req, res) => {                  
  const { email, password } = req.body;
  try {
     const user = await verifyCredentials(email, password);

    const token = await  tokenActions.createToken(user.id, email, user.roles);
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

module.exports = { loginUser, logoutUser };
