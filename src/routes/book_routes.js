const express = require("express");
const bookServices = require('../services/books')
const { verifyToken } = require("../auth/middlewares/authJwt");

const router = express.Router();

router.post("/books", verifyToken, bookServices.createBooks);
router.get("/books", verifyToken, bookServices.getAllBooks);
router.get("/booksby", verifyToken, bookServices.getBooksBy);
router.put("/book/:id", verifyToken, bookServices.updateBookById);
router.delete("/book/:id", verifyToken, bookServices.deleteBookByID);

module.exports = router;