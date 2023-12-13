// db.js
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/UsersManagement');
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectToDatabase;
