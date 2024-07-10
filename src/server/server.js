const express = require('express');
const app = express();
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const blogRoutes = require('./Routes/blogRoutes.js');
const taskRoutes = require('./Routes/taskRoutes.js');
const connectToDatabase = require('./db/db.js');
const cors = require('cors');

app.use(cors({
  origin:"http://localhost:3000",
  credentials: true,
}));

app.use('/', authRoutes); // Endpoint register
app.use('/', userRoutes); // Endpoint login
app.use('/', blogRoutes); // Endpoint blog
app.use('/', taskRoutes); // Endpoint task



// async funtion to start db then the server 
const startBackEnd = async () => {
  try {
    await connectToDatabase();
    const port = process.argv[2] ||  5000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error('Error starting server:', error.message);
  }
};


startBackEnd();
