const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    genre: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 100,
      min: [1, "Price is  greater than 0"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", BookSchema);