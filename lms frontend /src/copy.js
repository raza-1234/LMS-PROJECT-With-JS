import React from 'react'
import CustomButton from '../static components/CustomButton'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import moment from 'moment'

const TableRow = (props) => {
  console.log("in table rowww..........", props);
  const {
    data,
    booksData,
    assignBookHandler,
    deleteBookRecord,
    editStudentHandler,
    returnBookHandler,
    getStudentDetail,
    editHandler,
    duration,
    setDuration
  } = props

  useEffect(() => {
    console.log("Inside the effect hook")
    if(data.studentDetail[0]) {
      const currentDate = moment(moment() , "YYYY-MM-DD");
      const returnBookDate = moment(data.studentDetail[0].returnDate, "YYYY-MM-DD")
      const days = returnBookDate.diff(currentDate, "days")
      setDuration(days)
    }
  }, [data])

  return (
    <tr>
      {console.log("------------------>>>>>>>>>>>>>>")}
      <td>{data.name.charAt(0).toUpperCase()}{data.name.slice(1)}</td>
      <td>{data.author.charAt(0).toUpperCase()}{data.author.slice(1)}</td>
      <td>{data.edition}</td>
      <td>{data.assigned ? "Not Available" : "Available"}</td>
      <td>
        <DeleteIcon className = "delIcon" onClick = {() => (deleteBookRecord(data.id))}/>
        <EditIcon onClick = {() => editHandler(data.id)}/>
      </td>
      <td>
        {
          data.assigned ? 
          <div className={duration < 0 ? "dueDatePassed"  : "dueDateNotPassed"}>
            <CustomButton value= "Edit Student" clickFunction={() => (editStudentHandler(data.id))}/>
            <CustomButton value= "Return Book" clickFunction={() => (returnBookHandler(data.id))}/>
            <CustomButton value= "Student Info" clickFunction={() => (getStudentDetail(data.id))}/>
          </div>
          :<CustomButton value= "Assign Book" clickFunction={() => assignBookHandler(data.id)}/>
        }
      </td>
    </tr>
  )
}

export default TableRow
