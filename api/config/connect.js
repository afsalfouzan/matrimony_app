const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURI = 'mongodb://localhost:27017/matrimony_app';

// Create a MongoDB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Bind connection events (optional, but useful for error handling)
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  });
});

// Export the Mongoose instance
module.exports = mongoose;
