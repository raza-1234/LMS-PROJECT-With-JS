import React from 'react'
import CustomButton from '../shared/CustomButton'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TableRow = (props) => {

  const {
    data,
    assignBookHandler,
    deleteBookRecord,
    returnBookHandler,
    handleBookModal
  } = props

  return (
    <tr className={data.isDue? "dueDatePassed" : "dueDateNotPassed"}>
      <td>{data.name.charAt(0).toUpperCase()}{data.name.slice(1)}</td>
      <td>{data.author.charAt(0).toUpperCase()}{data.author.slice(1)}</td>
      <td>{data.edition}</td>
      <td>{data.assigned ? "Not Available" : "Available"}</td>
      <td>
        <DeleteIcon className = "delIcon" onClick = {() => (deleteBookRecord(data.id))}/>
        <EditIcon onClick = {() => handleBookModal(data.id, "Edit Book")}/>
      </td>
      <td>
        {
          data.assigned ? 
          <div>
            <CustomButton value= "Edit Student" clickFunction={() => (handleBookModal(data.id, "Edit Student"))}/>
            <CustomButton value= "Return Book" clickFunction={() => (returnBookHandler(data.id))}/>
            <CustomButton value= "Student Info" clickFunction={() => (handleBookModal(data.id, "Student Detail"))}/>
          </div>
          :<CustomButton value= "Assign Book" clickFunction={() => assignBookHandler(data.id)}/>
        }
      </td>
    </tr>
  )
}

export default TableRow


