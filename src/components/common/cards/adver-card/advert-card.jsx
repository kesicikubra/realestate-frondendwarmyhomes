import Link from 'next/link';
import React from 'react'
import "./style.scss"
import FavoritesHeartBtn from './favorites-heart-btn';

const AdvertCard = ({id, featured_image, title, district, city, price,country, slug, favorited_advert}) => {

  return (
    <div className='card-container'>
    <Link 
      className='card advert-card'
      style={{backgroundImage:`url(data:image/jpeg;base64,${featured_image})`}}
      href={`/advert/${slug}?id=${id}`}>
      
      <div className="card-footer">
        <div className="card-text h-25">
            <p>{title}</p>
            <span>{district},{city}, {country}</span>
        </div>
        <div className="card-price">
            $ {price}
        </div>
      </div>
    </Link>
    <FavoritesHeartBtn advertId={id} favorited_advert={favorited_advert}/>
    </div>
  )
}

export default AdvertCard