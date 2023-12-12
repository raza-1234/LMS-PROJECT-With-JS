const {students, books} = require("../models")
const moment = require("moment") //

const assignBook = async(req, res) =>{
    const { id } = req.params;
    const {name, rollno, email, assignDate, returnDate} = req.body;

    try{
        const bookExist = await books.findOne({where : {id}});
        if(!bookExist) {
            return res.status(404).json({"message" : `Book With Id ${id} Not Exist.`})
        }
        if(bookExist.assigned) {
            return res.status(404).json({"message" : `Book With Id ${id} Not Available For Now(Already Borrowed By Someone.).`})
        }
        const assignBook = await students.create({name, rollno, email, bookId : bookExist.id, assignDate, returnDate});
        
        await bookExist.update({assigned: true})
        return res.status(200).send(assignBook)
    }catch (err) {
        console.log(err);
        return res.status(500).json({"message" : err})
    }
}

const returnBook = async(req, res) => {
    const id = Number(req.params.id);
    try{
        const bookExist = await books.findOne({where : {id}});
        if(!bookExist) {
            return res.status(404).json({"message" : `No Book Exist With Id ${id}`})
        }
        if(!bookExist.assigned) {
            return res.status(200).json({"message" : `Book With Id ${id} Already Returned To Library.`})
        }
        const studentRecord = await students.findOne({where : {"bookId" : id}});
        await studentRecord.destroy();
        await bookExist.update({assigned: false})
        return res.send("Book Returned.")
    }catch (err) {
        return res.status(500).json({"message" : err})
    }
    
}

const updateStudent = async(req, res) => {
    const {id} = req.params;
    const {name, email, rollno, assignDate, returnDate} = req.body;

    try {
        const studentExist = await students.findOne({where : {'bookId' : id}})
        if(!studentExist) {
            return res.status(404).json({"Message" : "No Record Exist."})
        }

        const data = {
            name : name || studentExist.name,
            email : email || studentExist.email,
            rollno : rollno || studentExist.rollno,
            assignDate : assignDate || studentExist.assignDate,
            returnDate : returnDate || studentExist.returnDate,
            bookId : studentExist.bookId
        }

        await studentExist.update(data);
        return res.status(200).json(data)

    } catch(err) {
        console.log(err);
        return res.status(500).json({"message" : err})
    }


}

const getAllStudents = async(req, res) => {
    try{
        const result = await students.findAll();
        if(result.length === 0) {
            return res.status(200).json({"Message" : "No Student Exist."})
        }
        return res.status(200).json(result)
    }catch(err) {
        return res.status(500).json({"message" : err})
    }
}

module.exports = {
    assignBook,
    returnBook,
    updateStudent,
    getAllStudents
}