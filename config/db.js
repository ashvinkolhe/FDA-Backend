const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables

const db = async () => {
  try {
    // Ensure the MONGODB_URI is not undefined
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI not found in environment variables!');
      process.exit(1); // Exit if MONGODB_URI is not set
    }

    // Connect to MongoDB using the URI from the environment variable
    await mongoose.connect(process.env.MONGODB_URI); // No need for deprecated options

    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = db;
