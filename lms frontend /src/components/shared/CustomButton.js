import React from 'react'

const CustomButton = ({value, clickFunction}) => {

  return (
    <button 
      onClick = {clickFunction}
      className='customButton' 
      type='button'
    >
      {value}
    </button>
  )
}

export default CustomButton
