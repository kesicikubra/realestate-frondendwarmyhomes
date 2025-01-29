import Image from 'next/image';
import React from 'react'
import "./property-cell.scss";

const PropertyCell = ({row}) => {

    const {image, city, country, district, title, price} = row

  return (
    <div className='property-cell'>
      <span className='d-lg-none text-left w-100 ms-2 pt-3'>Property</span>
        <div className='img-container'>
            <Image src={`/images/section-images/${image}`} alt={title}  width={187} height={100}/>
        </div>
        <div className='info-container'>
            <h5>{title}</h5>
            <p>{country}, {city}, {district}</p>
            <p>${price}</p>
        </div>
    </div>
  )
}

export default PropertyCell