const {sequelize, books} = require("./src/models")
const bookRouter = require("./src/routes/bookRoutes");
const assignBookRouter = require("./src/routes/assignedBook")
const bookDetailRouter = require("./src/routes/checkBookRecord")
const express = require("express");
var cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json());
app.use("/", bookRouter)
app.use("/student", assignBookRouter)
app.use("/book", bookDetailRouter)


app.listen(3500, async() => {
	console.log("server successfully running.");
	await sequelize.authenticate();
	console.log("connection created successfully.");
})