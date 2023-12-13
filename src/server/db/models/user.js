const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  roles: { type: [String], default: ['regular'] }, // Array of roles with default 'user' role
});

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return { salt, hashedPassword };
  } catch (error) {
    throw error;
  }
};


userSchema.pre('save', async function (next) {
  try {
    const { salt, hashedPassword } = await hashPassword(this.password);
    this.password = hashedPassword;
    this.salt = salt;
    next();
  } catch (error) {
    next(error);
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
