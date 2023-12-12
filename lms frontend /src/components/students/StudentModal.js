import React from 'react'
import { useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios"
import moment from "moment"

const StudentModal = ({value, bookId, data, handleStudentModel, fetchData}) => {

	const [name, setName] = useState(data?.studentDetail[0]?.name || "");
	const [rollNo, setRollNo] = useState(data?.studentDetail[0]?.rollno || "")
	const [email, setEmail] = useState(data?.studentDetail[0]?.email || "")
	const [assignDate, setAssignDate] = useState(data?.studentDetail[0]?.assignDate || "");
	const [returnDate, setReturnDate] = useState(data?.studentDetail[0]?.returnDate || "")
	
	async function submitHandler(event) {
		event.preventDefault();

		if (name.trim().length === 0 || rollNo.trim().length === 0 || email.trim().length === 0 ){
			return alert("Required Fields Are Not Correct.")
		}
		const object = {
			name: name,
			rollno: rollNo,
			email: email,
			assignDate: assignDate,
			returnDate : returnDate
		}
		
		try {
			let response ; 
			if (data){
				console.log("in edit student modal");
				const {bookId} = data.studentDetail[0];
				response = await axios.put(`http://localhost:3500/student/v1/${bookId}/updateStudent`, object)
			}
			else {
				response = await axios.post(`http://localhost:3500/student/v1/${bookId}/assignedBook`, object)
			}
			if (response.statusText === "OK"){
				fetchData() 
				handleStudentModel()
			}

			setName("")
			setRollNo("")
			setEmail("")
			setAssignDate("")
			setReturnDate("")
		} catch (err) {
			console.log(err);
		}
	}

  return (
    <div className='modal-Container'>
			<div className='modalHeader'>
				<h3>LMS</h3>
				<h3>{value}</h3>
				<CloseIcon onClick = {handleStudentModel}/>
			</div>
			<hr/>
			<div className='modal'>
				<form className='addBookForm' onSubmit={submitHandler}>
					<input 
						required
						type='text'
						value={name}
						onChange = {(e) => (setName(e.target.value))}
						placeholder='Student Name'
					/>
					<br/><br/>
					<input 
						required
						type='text'
						value={rollNo}
						onChange = {(e) => setRollNo(e.target.value)}
						placeholder='Student Roll-No'
					/>
					<br/><br/>
					<input 
						required
						type='email'
						value={email}
						onChange = {(e) => setEmail(e.target.value)}
						placeholder='Student Email'
					/>
					<br/><br/>
					<input 
						required
						type='date'
						value={assignDate}
						onChange = {(e) => setAssignDate(e.target.value)}
						placeholder='Book Issue Date'
					/>
					<br/><br/>
					<input 
						required
						type='date'
						value={returnDate}
						onChange = {(e) => setReturnDate(e.target.value)}
						placeholder='Book Return Date'
						min={moment().format("YYYY-MM-DD")}
					/>
					<br/><br/>
					<button className='newBook'>{value}</button>
				</form>
			</div>
    </div>
  )
}

export default StudentModal
