const mongoose = require("mongoose"); // Importing the 'mongoose' module to interact with MongoDB
const dotenv = require("dotenv"); // Importing 'dotenv' to load environment variables from the '.env' file

dotenv.config(); // Loading environment variables from the '.env' file to make them accessible in 'process.env'

// Retrieve the MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

// Ensure that the 'MONGO_URI' environment variable is defined
// If it's not set, log an error message and terminate the application with a non-zero exit code
if (!MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in the environment variables");
  process.exit(1); // Exit the process with an error code indicating a missing environment variable
}

// Attempt to connect to MongoDB using the MONGO_URI retrieved from the environment variable
// The 'connect' method returns a promise that either resolves (success) or rejects (failure)
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB!")) // Log success message if the connection is established
  .catch((err) => {
    // If there's an error connecting to MongoDB, log the error and exit the process
    console.error("Error while connecting to MongoDB:", err);
    process.exit(1); // Exit the process with an error code indicating failure in database connection
  });
