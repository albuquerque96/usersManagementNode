const express = require('express');
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const blogRoutes = require('./Routes/blogRoutes.js');
const taskRoutes = require('./Routes/taskRoutes.js');
const connectToDatabase = require('./db/db.js');
const cors = require('cors');

const app = express();
const allowedOrigins = ['http://127.0.0.1:5000','http://127.0.0.1:3000'];  

app.use(cors({
  allowedOrigins
}));

// async funtion to start db then the server 
const startBackEnd = async () => {
  try {
    await connectToDatabase();
    app.use('/', authRoutes); // Endpoint register
    app.use('/', userRoutes); // Endpoint login
    app.use('/', blogRoutes); // Endpoint blog
    app.use('/', taskRoutes); // Endpoint task

    const port = process.argv[2] ||  5000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error('Error starting server:', error.message);
  }
};


startBackEnd();
