require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const tokenActions = {
  createToken: (id, email, roles) => {
    return jwt.sign({ id, email, roles }, secretKey, { expiresIn: '4h' });
  },
  verifyToken: (token) => {
    if (!token) {
      return { message: 'No token provided' };
    }
    try {
      const decoded = jwt.verify(token, secretKey);
      return { valid: true, decoded };
    } catch (err) {
      return { valid: false, error: err.message };
    }
  }
};

module.exports = tokenActions;
