const Books = require("../models/book"); // Importing the 'book' model to interact with the MongoDB collection for books


// Controller function to create a new book
exports.createBook = (req, res, next) => {
  // The 'create' method of the 'Books' model is used to add a new book to the database
  // The book details are passed in the request body
  Books.create(req.body)
    .then((book) => {
      // If the book is created successfully, send the book object as a response with status 201 (Created)
      res.status(201).json(book);
    })
    .catch((err) => {
      // If there is an error during book creation, pass the error to the error handling middleware
      next(err);
    });
};

// Controller function to get all books from the database
exports.getAllBooks = (req, res, next) => {
  // The 'find' method retrieves all books from the 'Books' collection
  Books.find()
    .then((books) => {
      // If no books are found, create an error and pass it to the error handling middleware
      if (books.length === 0) {
        const err = new Error("No Books Found");
        err.status = 404; // Set the error status to 404 (Not Found)
        return next(err); // Pass the error to the error handling middleware
      }
      // If books are found, return them as a response with status 200 (OK)
      res.status(200).json(books);
    })
    .catch((err) => {
      // If there is an error during the 'find' operation, pass the error to the error handling middleware
      next(err);
    });
};

// Controller function to update a book's details by its title
exports.updateBookByTitle = (req, res, next) => {
  // The 'findOneAndUpdate' method is used to find a book by its title and update it with the data from the request body
  Books.findOneAndUpdate({ title: req.params.title }, req.body, {
    new: true, // Return the updated document
  })
    .then((book) => {
      // If the book is not found, create an error and pass it to the error handling middleware
      if (!book) {
        const err = new Error("Book not found");
        err.status = 404; // Set the error status to 404 (Not Found)
        return next(err); // Pass the error to the error handling middleware
      }
      // If the book is found and updated, return the updated book object with status 200 (OK)
      res.status(200).json(book);
    })
    .catch((err) => {
      // If there is an error during the update operation, pass the error to the error handling middleware
      next(err);
    });
};

// Controller function to delete a book by its title
exports.deleteBookByTitle = (req, res, next) => {
  // The 'findOneAndDelete' method is used to find a book by its title and delete it from the database
  Books.findOneAndDelete({ title: req.params.title })
    .then((book) => {
      // If the book is not found, create an error and pass it to the error handling middleware
      if (!book) {
        const err = new Error("Book not found");
        err.status = 404; // Set the error status to 404 (Not Found)
        return next(err); // Pass the error to the error handling middleware
      }
      // If the book is successfully deleted, return a success message with status 200 (OK)
      res.status(200).json({ message: "Book deleted successfully" });
    })
    .catch((err) => {
      // If there is an error during the deletion operation, pass the error to the error handling middleware
      next(err);
    });
};

// Controller function to get books by genre
exports.getBooksByGenre = (req, res, next) => {
  // The 'find' method is used to find books that match the genre parameter in the request
  Books.find({ genre: req.params.genre })
    .then((books) => {
      // If no books are found for the specified genre, create an error and pass it to the error handling middleware
      if (books.length === 0) {
        const err = new Error("No Books Found for this Genre");
        err.status = 404; // Set the error status to 404 (Not Found)
        return next(err); // Pass the error to the error handling middleware
      }
      // If books are found, return them as a response with status 200 (OK)
      res.status(200).json(books);
    })
    .catch((err) => {
      // If there is an error during the 'find' operation, pass the error to the error handling middleware
      next(err);
    });
};
