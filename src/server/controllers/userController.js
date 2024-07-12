const { validateEmailFormat, validatePasswordFormat } = require('../services/credentialsFormatValidation');
const userService = require('../services/userService');

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !validateEmailFormat(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!validatePasswordFormat(password)) {
    return res.status(400).json({ error: 'Invalid password format' });
  }

  try {
    const { success, message, token } = await userService.registerUser(email, password);
    if (success) {
      res.cookie('jwtToken', token, { domain: 'localhost', path: '/', httpOnly: true });
      return res.status(201).json({ message });
    } else {
      return res.status(400).json({ error: message });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  const token = req.cookies.jwtToken;

  try {
    const { success, message } = await userService.deleteUser(token);
    if (success) {
      return res.status(200).json({ message });
    } else {
      return res.status(401).json({ message });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { registerUser, deleteUser };
