import React from 'react'
import "./style.scss"
import { FaPlus } from "react-icons/fa";
import Link from 'next/link';

const AddNewAdvertTypeButton = () => {
  return (
    <Link href="/dashboard/advert-types/new" className='btn btn-primary advert-type'>
      <span className='d-none d-md-block'>Add New</span>
      <span className='d-md-none'><FaPlus size={20}/></span>
    </Link>
  )
}

export default AddNewAdvertTypeButton