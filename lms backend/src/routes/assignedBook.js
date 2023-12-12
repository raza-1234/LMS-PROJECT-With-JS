const express = require("express");
const router = express.Router();
const {assignBook, returnBook, updateStudent, getAllStudents} = require("../controllers/assignBookController")
const {paramValidator, studentBodyValidator} = require("../MiddleWares/validationMiddleware")

// router.get("/allStudents", getAllStudents)
// router.post("/v1/:id/assignedBook", studentBodyValidator(), assignBook);
// router.delete("/v1/:id/returnBook", paramValidator(), returnBook)
// router.put("/v1/:id/updateStudent", paramValidator(), studentBodyValidator(), updateStudent)

router.get("/allStudents", getAllStudents)
router.post("/v1/:id/assignedBook", assignBook);
router.delete("/v1/:id/returnBook",  returnBook)
router.put("/v1/:id/updateStudent", updateStudent)

module.exports = router;