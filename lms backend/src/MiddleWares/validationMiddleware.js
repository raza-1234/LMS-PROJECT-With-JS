const {body, param, validationResult} = require("express-validator");
const { options } = require("../routes/assignedBook");

const bodyValidator = () => {
	return [
		body("name").trim().notEmpty().withMessage("Name Can Not Be Empty."),
		body("author").trim().notEmpty().withMessage("Author Can Not Be Empty."),
		body("edition").trim().notEmpty().withMessage("Edition Can Not Be Empty."),
		// body('asssigned').isBoolean().withMessage("Assigned Must Have Boolean Value."),
    // body('asssigned').isBoolean({
    //   strict: false,
    //   loose: true,
    // }).withMessage("Assigned Must Have Boolean Value."),
        (req, res, next) => {
          console.log(typeof req.body.assigned);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(422).json({errors: errors.array()})
            }
            next();
          }
        
	]
}

const paramValidator = () => {
    return [
        param("id").trim().notEmpty().withMessage("Id Can Not Be Empty.").isInt().toInt().withMessage("Id Should Be Number."),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(422).json({errors: errors.array()})
            }
            next();
        }
    ]
} 

const studentBodyValidator = () => {
    return [
        body("name").trim().notEmpty().withMessage("Student Name Is Required."),
        body("rollno").trim().notEmpty().withMessage("Student Roll Number Is Required."),
        body("email").trim().notEmpty().withMessage("Email Is Required.").isEmail().withMessage("Enter Valid Email."),
        body("assignDate").trim().notEmpty().withMessage("AssignDate iS Required."),
        body("returnDate").trim().notEmpty().withMessage("ReturnDate iS Required"),
        // body("assignDate").trim().notEmpty().withMessage("AssignDate iS Required.").IsDateString().isDate({format: "YYYY-MM-DD"}).withMessage("Date (e.g: 2000-05-20) Is Required."),
        // body("returnDate").trim().notEmpty().withMessage("ReturnDate iS Required").isISO8601().isDate({format: "YYYY-MM-DD"}).withMessage("Date (e.g: 2000-05-20) Is Required.")
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(422).json({errors: errors.array()})
            }
            next();
          }
    ]
}

module.exports = {
  bodyValidator,
  paramValidator,
  studentBodyValidator 
}