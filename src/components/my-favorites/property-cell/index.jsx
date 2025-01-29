import Image from "next/image";
import React from "react";
import "./style.scss";

const MyFavoriteAdvertsPropertyCell = ({ row }) => {
  
  const { featuredImage, city, country, district, title, price } = row;

  return (
    <div className="property-cell">
      <span className="d-lg-none text-left w-100 ms-2 pt-3">Property</span>
      <div className="img-container">
        {!featuredImage || featuredImage == null ? (
          <Image
            src="/images/logo/favicon.png"
            alt="logo"
            width={187}
            height={100}
          />
        ) : (
          <Image
            src={`data:image/jpeg;base64,${featuredImage}`}
            alt={title}
            width={187}
            height={100}
          />
        )}
      </div>
      <div className="info-container">
        <h5>{title}</h5>
        <p>
          {district}, {city}, {country}
        </p>
        <p>${price}</p>
      </div>
    </div>
  );
};

export default MyFavoriteAdvertsPropertyCell;
