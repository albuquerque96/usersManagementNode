const express = require('express');
const registerRoutes = require('./Routes/registerRoutes.js');
const loginRoutes = require('./Routes/loginRoutes.js');
const blogRoutes = require('./Routes/blogRoutes.js');
const connectToDatabase = require('./db/db.js');
const cors = require('cors');

const app = express();
const allowedOrigins = ['http://127.0.0.1:5000','http://127.0.0.1:3000'];  

app.use(cors({
  allowedOrigins
}));

// Função assíncrona para iniciar o servidor após a conexão com o banco de dados
const startBackEnd = async () => {
  try {
    await connectToDatabase();
    app.use('/', registerRoutes); // Endpoint register
    app.use('/', loginRoutes); // Endpoint login
    app.use('/', blogRoutes); // Endpoint blog

    const port = process.argv[2] ||  5000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error('Error starting server:', error.message);
  }
};

// Inicia a bd e server 
startBackEnd();
