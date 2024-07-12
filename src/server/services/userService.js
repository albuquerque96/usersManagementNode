const bcrypt = require('bcrypt');
const User = require('../db/models/user');
const tokenActions = require('./tokenService');

const registerUser = async (email, password) => {
  try {
    if (await User.findOne({ email })) {
      return { success: false, message: 'Email already in use' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();
    const token = tokenActions.createToken(newUser._id, email, newUser.roles);

    return { success: true, message: 'User created successfully!', token };
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user');
  }
};

const deleteUser = async (token) => {
    const { valid, decoded, error } = tokenActions.validateToken(token);
  
    if (!valid) {
      return { success: false, message: error || 'Invalid Token' };
    }
  
    try {
      const deletedUser = await User.findByIdAndDelete(decoded.id);
      if (!deletedUser) {
        return { success: false, message: 'User not found' };
      }
      return { success: true, message: 'User deleted successfully!' };
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting user');
    }
  };

  const findUserbyEmail= async (email) => {
    try {
        const user = await User.findOne({ email });
        return user
      } catch (error) {
        return { error: error.message};
      }
  }
  const changePassword = async (email, password,newpassword)=> {
//verify credentials if succesfull change password on database

  }
module.exports = {
  registerUser,
  deleteUser,
  findUserbyEmail
};
