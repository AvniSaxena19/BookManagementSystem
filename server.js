const express = require("express"); // Importing express module
const dotenv = require("dotenv"); // Importing dotenv module
dotenv.config(); // Configuring dotenv
const PORT = process.env.PORT || 6000; // Getting the port from the environment variables or setting it to 6000
require("./db/database"); // Importing the database connection file
const app = express(); // Creating an express app
const bookRoutes = require("./routes/books"); // Importing the book routes

// Error handling function
const handleErrors = (err, req, res, next) => {
  const status = err.status || 500; // Setting the status to the error status or 500
  // Sending the error message as a response
  res.status(status).json({
    success: false,
    message: err.message,
  });
};

app.use(express.json()); // Middleware to parse JSON data

app.use("/books", bookRoutes); // Book routes middleware

// Route not found middleware
app.use((req, res, next) => {
  const err = new Error("Route Not Found");
  err.status = 404;
  next(err); // Passing the error to the error handling middleware
});

// Error handling middleware
app.use(handleErrors);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});