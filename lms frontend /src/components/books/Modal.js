import React from 'react'
import {useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios"

const Modal = ({handleBookModal, value, data, fetchData}) => {

	const [name, setName] = useState(data?.name || "");
	const [author, setAuthor] = useState(data?.author || "");
	const [edition, setEdition] = useState(data?.edition || "");
	const [status, setStatus] = useState(data?.assigned? "Not Available" : "Available" || "");
	
	async function submitHandler(event) {
		event.preventDefault();
		try {
			if (name.trim().length === 0 || author.trim().length === 0 || !edition || edition <= 0){
				alert("Required Fields Are Not Entered Properly");
				return false;
			}

			const object = {
				name : name,
				author : author,
				edition : edition,
				assigned: status === "available" ? true : false
			}
			let response;
			if (data){
				response = await axios.put(`http://localhost:3500/${data.id}`, object);
			} else{
				response = await axios.post("http://localhost:3500/", object);
			}
			if (response.statusText === "OK"){ //
				fetchData()
				handleBookModal() 
			}
			setName("");
			setAuthor("")
			setEdition("")
			setStatus()
		}catch(err) {
			console.log(err);
		}
	}

  return (
    <div className='modal-Container'>
			<div className='modalHeader'>
				<h3>LMS</h3>
				<h3>{value}</h3>
				<CloseIcon onClick = {handleBookModal}/>
			</div>
			<hr/>
			<div className='modal'>
				<form className='addBookForm' onSubmit={submitHandler}>
					<input 
						required
						type='text'
						value={name}
						onChange = {(e) => (setName(e.target.value))}
						placeholder='Book Name'
					/>
					<br/><br/>
					<input 
						required
						type='text'
						value={author}
						onChange = {(e) => setAuthor(e.target.value)}
						placeholder='Author Name'
					/>
					<br/><br/>
					<input 
						required
						type='Number'
						value={edition}
						onChange = {(e) => setEdition(e.target.value)}
						min={1}
						placeholder='Edition'
					/>
					<br/><br/>
					<select 
						required
						value={status}
						onChange = {(e) => setStatus(e.target.value)}
					>
						<option disabled = {data?.studentDetail?.length > 0}>Available</option>
						<option disabled = {!data || data?.studentDetail?.length === 0}>Not Available</option>
					</select>
					<br/><br/>
					<button className='newBook'>{value}</button>
				</form>
			</div>
    </div>
  )
}

export default Modal
