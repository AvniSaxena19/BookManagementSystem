const express = require("express"); // Importing the express module to create the server and define routes
const router = express.Router(); // Creating an express router for defining routes

// Importing the functions that handle book-related operations
const {
  createBook, // Creates a new book
  getAllBooks, // Retrieves all books
  updateBookByTitle, // Updates a book by its title
  deleteBookByTitle, // Deletes a book by its title
  getBooksByGenre, // Retrieves books by genre
} = require("../controllers/books");

// Route to create a new book
router.post("/", createBook);

// Route to get all books
router.get("/", getAllBooks);

// Route to update a book by title
router.put("/:title", updateBookByTitle);

// Route to delete a book by title
router.delete("/:title", deleteBookByTitle);

// Route to get books by genre
router.get("/genre/:genre", getBooksByGenre);

module.exports = router; // Exporting the router for use in other parts of the app
