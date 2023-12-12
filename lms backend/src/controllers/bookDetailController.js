const {books, students} = require("../models");
const {Op} = require("sequelize") 

const getBookDetail = async(req, res) => {
    const {id} =req.params;

    try {
        const bookExist  = await books.findOne({where : {id}, include : "studentDetail"});
        if(!bookExist) {
            return res.status(404).json({"message" : `No Book Found Of Id ${id}`});
        }

        return res.send(bookExist)
    } catch(err) {
        return res.status(500).json({"message" : err})
    }
}

const getBooksDetail = async(req, res) => {

    try {
        const booksExist  = await books.findAll({include : "studentDetail"});
        if(booksExist.length === 0) {
            return res.status(200).json({"message" : `No Book Exist.`});
        }
        return res.send(booksExist)
    } catch(err) {
        return res.status(500).json({"message" : err})
    }
}


module.exports = {getBookDetail, getBooksDetail}