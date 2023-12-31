const mongoose = require("mongoose");

const Books = new mongoose.Schema(
  {
    name: String,
    author: String,
    status: String,
  },
  { timestamps: true }
);

const Book = mongoose.models.Books || mongoose.model("Books", Books);

module.exports = Book;
