require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');

const tokenActions = {
  createToken: async (email, roles) => {
    return jwt.sign({ email, roles }, secretKey, { expiresIn: '4h' });
  },
  revokeToken: async (userId) => {
    // Implemente a lógica para revogar tokens aqui
  },
  refreshToken: async (userId,email,password) => {
      //verificar as credenciais do user e caso estejam corretas renovar o periodo do token  
  },
  authenticateToken: async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const user = jwt.verify(token, secretKey);
      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  }
};

module.exports = tokenActions;
