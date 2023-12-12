import React, { Fragment } from 'react'
import {useEffect, useState} from 'react';
import axios from "axios"
import Modal from './Modal';
import StudentModal from '../students/StudentModal';
import StudentTableModal from '../students/StudentTableModal';
import TableRow from './TableRow';
import moment from 'moment'

const BookTable = () => {
	const [booksData, setBooksData] = useState([]);
	const [isBookModal, setIsBookModal] = useState(false); // isBookModal
	const [isStudentModalOpen, setIsStudentModalOpen] = useState(false)
	const [bookId, setBookId] = useState("")
	const [booksDetails, setBooksDetails] = useState();
	const [isStudentDetailModalOpen, setIsStudentDetailModalOpen] = useState(false)

  useEffect(() => {
    fetchData();
  },[])

  async function fetchData() { // changes done
    try {
      const result = await axios.get("http://localhost:3500/book/allBooks");
			if (result?.data?.length > 0){
				result.data.forEach((data) => {
          if(data.studentDetail.length > 0) {
            const currentDate = moment(moment() , "YYYY-MM-DD");
            const returnBookDate = moment(data.studentDetail[0].returnDate, "YYYY-MM-DD")
            const days = returnBookDate.diff(currentDate, "days")
            if(days < 0) {
              data.isDue = true
            }  
          }
        })
        setBooksData(result.data)
				return ; 
			}
      setBooksData([])
    } catch(err) {
      console.log(err);
    }
  }

	async function deleteBookRecord(id) { // OK
		try {
			const bookAssigned = booksData.find((book) => (book.id === id))
			if(bookAssigned.assigned) {
				return alert("This Book Is Assigned To Student. You Can Not Delete It.")
			}
			const result = await axios.delete(`http://localhost:3500/${id}`)
			if (result.statusText === "OK"){
				fetchData()
			}
		}catch(err) {
			console.log(err);
		}
	}

	function assignBookHandler(id) { // OK
		setBookId(id)
		handleStudentModel()
	}

	const handleStudentDetailModal = () => { // Ok
		setIsStudentDetailModalOpen(!isStudentDetailModalOpen)
	}

	async function returnBookHandler(id) { // Ok
		try {
			const response = await axios.delete(`http://localhost:3500/student/v1/${id}/returnBook`)
			if (response.statusText === "OK"){ //
				fetchData()
			}
		} catch(err){
			console.log(err);
		}
	}

	const handleBookModal = async (id, uniqueString) => { //changes done
		if (Number(id)){
			const result = await bookDetailHandler(id)
			setBooksDetails(result.data)
			if (uniqueString === "Edit Book"){
				return setIsBookModal(!isBookModal)
			} else if (uniqueString === "Student Detail"){
				return handleStudentDetailModal()
			} else {
				console.log("in student edit model");
				return handleStudentModel(id)
			} 
		}
		setBooksDetails()
		setIsBookModal(!isBookModal)
	}

	const handleStudentModel = (id) => { //changes done
		if (id){
			return setIsStudentModalOpen(!isStudentModalOpen)
		}
		setBooksDetails()
		setIsStudentModalOpen(!isStudentModalOpen)
	}

	const bookDetailHandler = async (id) => { //changes done
		try {
			const result = await axios.get(`http://localhost:3500/book/${id}/getBookRecord`)
			if (result.statusText === "OK"){
				return result;
			}
		} catch(err) {
			console.log('err', err);
		}
	}

	return (
		<Fragment>
			<div className='addBookButtonDiv'>
      	<button className = "addBookButton" onClick = {() => handleBookModal()}> Add New Book</button>
			</div>
			<table className='bookTable'>
				<thead>
					<tr>
						<th>Book Name</th>
						<th>Author Name</th>
						<th>Book Edition</th>
						<th>Status</th>
						<th>Del/Edit</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{
						booksData.length > 0 ?
						booksData.map((booksDetail) => {
							return (
								<TableRow key={booksDetail.id}
									data = {booksDetail}
									assignBookHandler = {assignBookHandler}
									deleteBookRecord = {deleteBookRecord}
									returnBookHandler = {returnBookHandler}
									handleBookModal = {handleBookModal}
								/>
							)
						})
						:<tr>
							<td></td>
							<td></td>
							<td>No Book Exist.</td>
							<td></td>
							<td></td>
						</tr>
					}
				</tbody>
			</table>
			{
				isBookModal && 
				<Modal 
					value = {booksDetails? "Edit Book" : "Add Book"}
					handleBookModal={handleBookModal}
					data = {booksDetails}
					fetchData = {fetchData}
				/>
			}
			{
				isStudentModalOpen &&
				<StudentModal
					value = {booksDetails? "Edit Student": 'Assign Book'}
					bookId = {bookId}
					data = {booksDetails}
					handleStudentModel = {handleStudentModel}
					fetchData={fetchData}
				/>
			}
			{
				isStudentDetailModalOpen &&
				<StudentTableModal
					data = {booksDetails}
					handleStudentTableModal = {handleStudentDetailModal}
				/>
			}
		</Fragment>
)
}

export default BookTable
