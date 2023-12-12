const express = require("express");
const router = express.Router();
const {getBookDetail, getBooksDetail} = require("../controllers/bookDetailController")
const {paramValidator} = require("../MiddleWares/validationMiddleware")

router.get("/:id/getBookRecord", paramValidator(), getBookDetail)
router.get("/allBooks", getBooksDetail)

module.exports = router;