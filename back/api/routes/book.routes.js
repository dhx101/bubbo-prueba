const express = require("express");
const {
	getBooks,
	getBook,
	postBook,
	updateBook,
	deleteBook,
} = require("../controllers/books.controller");

const bookRoutes = express.Router();
bookRoutes.get("/", getBooks);
bookRoutes.get("/:id", getBook);
bookRoutes.post("/", postBook);
bookRoutes.put("/:id", updateBook);
bookRoutes.delete("/:id", deleteBook);

module.exports = bookRoutes;
