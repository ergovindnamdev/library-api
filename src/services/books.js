const express = require("express");
const Book = require("../database/schema/books");

async function createBooks(req, res) {
  const { name, author, status } = req.body;
  try {
    const book = await Book.create({
      name,
      author,
      status,
    });
    return res.status(200).send(book);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

async function updateBookById(req, res) {
    const { id } = req.params;
    const { name, author, status } = req.body;

    try {
        const updateFields = { name, author, status };
        
        const book = await Book.findByIdAndUpdate(id, updateFields, { new: true });

        return res.status(200).send(book);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
}

async function getAllBooks(req, res) {
  try {
    const books = await Book.find();
    return res.status(200).send(books);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}

async function getBooksBy(req, res) {
  try {
    if (req.body.status) {
      const books = await Book.find({ status: req.body.status });
    } else if (req.body.author) {
      const books = await Book.find({ author: req.body.author });
    } else if (req.body.name) {
      const books = await Book.find({ name: req.body.name });
    }
    return res.status(200).send(books);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}

async function deleteBookByID(req, res) {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);
    return res.status(200).send(book);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}

module.exports = {
  deleteBookByID,
  getAllBooks,
  getBooksBy,
  createBooks,
  updateBookById
};
