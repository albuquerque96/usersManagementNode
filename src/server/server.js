const express = require('express');
const registerRoutes = require('./Routes/Registration/registerRoutes.js');
const loginRoutes = require('./Routes/Login/loginRoutes.js');
const connectToDatabase = require('./db/db.js');

const app = express();

// Middleware to parse JSON in request body
app.use(express.json());

app.use('/', registerRoutes); // Endpoint register
app.use('/', loginRoutes); // Endpoint login

connectToDatabase();

const port = process.argv[2] || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
