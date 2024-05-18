require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;


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
  verifyToken: async (token) => {
   
    if (token == null) {
      return { message: 'No token provided' }
    }

    try {
       await jwt.verify(token, secretKey);
      return true
      
    } catch (err) {
      return { message: 'Invalid token' }
    }
  }
};
module.exports = tokenActions;
