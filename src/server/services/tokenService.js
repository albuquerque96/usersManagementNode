require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt");
const tokenActions = {
  createToken: async (id, email, roles) => {
    return jwt.sign({ id, email, roles }, secretKey, { expiresIn: '4h' });
  },
  validateToken: async  (token) => {
    if (!token) {
      return { message: 'No token provided' };
    }
    try {
      const decoded = jwt.verify(token, secretKey);
      return { valid: true, decoded };
    } catch (err) {
      return { valid: false, error: err.message };
    }
  },
isPasswordMatch: async (password) => {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
}
};

module.exports = tokenActions;
