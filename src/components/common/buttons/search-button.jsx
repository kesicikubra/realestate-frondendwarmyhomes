import React from 'react'
import { LiaSearchSolid } from "react-icons/lia";

const SearchButton = () => {
  return (
    <button 
        className='btn btn-primary'
        type='submit'
        style={{
          width:"42px",
          height:"42px",
          borderRadius:"15px",
          padding:"0"
          
          
        }}>
        <LiaSearchSolid  size={25}/>
    </button>
  )
}

export default SearchButton