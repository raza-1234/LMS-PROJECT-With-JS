import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

const StudentTableModal = ({data, handleStudentTableModal}) => {

	const {name, email, rollno, bookId, assignDate, returnDate} = data.studentDetail[0]

  return (
    <div className='modal-wrapper'>
			<div className='modal-header'>
				<CloseIcon onClick ={handleStudentTableModal} />
			</div>
      <table className='studentTable'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Roll No</th>
						<th>Book Id</th>
						<th>Assigned Date</th>
						<th>Return Date</th>
					</tr>
				</thead>
        <tbody>
					<tr>
						<td>{name}</td>
						<td>{email}</td>
						<td>{rollno}</td>
						<td>{bookId}</td>
						<td>{assignDate}</td>
						<td>{returnDate}</td>
					</tr>
        </tbody>
      </table>
    </div>
  )
}

export default StudentTableModal
