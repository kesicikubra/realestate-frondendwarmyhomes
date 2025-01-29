import Image from 'next/image';
import React from 'react'
import "./style.scss";

const UserTourTequestPropertyCell = ({row}) => {

    const {imageData, advertTitle, cityName, districtName, countryName, advertPrice} = row


 
  return (
    <div className='property-cell'>
      <span className='d-lg-none text-left w-100 ms-2 pt-3'>Property</span>
        <div className='img-container'>
            <Image src={`data:image/jpeg;base64,${imageData}`} alt={advertTitle}  width={187} height={100}/>
        </div>
        <div className='info-container'>
            <h5>{advertTitle}</h5>
            <p>{districtName}, {cityName}, {countryName}</p>
            <p>${advertPrice}</p>
        </div>
    </div>
  )
}

export default UserTourTequestPropertyCell