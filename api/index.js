const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectedDB = require('./config/connect'); // Import the Mongoose connection
const Routes = require('./routes/routes'); // Import the user routes

// Middleware to parse JSON requests
app.use(express.json());

// Use the user routes
app.use(Routes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
