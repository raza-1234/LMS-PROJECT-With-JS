const express = require("express");
const app = express();
const router = express.Router();
const {bodyValidator, paramValidator} = require("../MiddleWares/validationMiddleware")
const {
	getAllBooks,
	addNewBook,
	updateBook,
	deleteBook,
} = require("../controllers/bookController")


router.get("/", getAllBooks);
router.post("/", bodyValidator(), addNewBook);
router.put("/:id", paramValidator(), bodyValidator(), updateBook)
router.delete("/:id", paramValidator(), deleteBook);

module.exports = router;     