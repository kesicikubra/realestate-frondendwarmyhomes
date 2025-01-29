"use client"
import React from 'react';
import "./style.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { PiHandSwipeRight } from "react-icons/pi";
import { faBuilding, faBuildingWheat, faCity, faHome, faHotel, faHouseChimneyWindow, faStore, faTractor, faWarehouse, faImage, faHouseLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDictionary } from '@/helpers/providers/lang-switcher-provider';

const ExploreByTypes = async({categoryData}) => {

  const handleIcon = (icon) => { 
    const mapIconToFontAwesome  = {
      "faWarehouse": faWarehouse,
      "faHome": faHome,
      "faTractor": faTractor,
      "faHotel" : faHotel,
      "faStore": faStore,
      "faBuildingWheat": faBuildingWheat,
      "faBuilding": faBuilding,
      "faCity": faCity,
      "faHouseChimneyWindow": faHouseChimneyWindow,
      "faHouseLaptop":faHouseLaptop,
      "faImage":faImage
    };
    const selectedIcon = mapIconToFontAwesome[icon] || null;
    return  <span className="d-flex alig-items-center justify-content-center">{selectedIcon && <FontAwesomeIcon icon={selectedIcon} size="xl"/>}</span> 
    }
    const t =await useDictionary();
  return (
    <div className='byTypes'>
      <h2>{t.home.exploreProperties}</h2>
      <h6>{t.home.byTypes}</h6>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1400: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false, 
        }}
      >
        {
          categoryData?.map((item)=>(
            <SwiperSlide key={item.category_id}>
              <div className="card">
                <div className="card-body">
                  <div className='img-box'>
                  {handleIcon(item.icon)}
                  </div>
                  <p>{item.category_title}</p>
                  <small>{item.amount} {t.home.properties}</small>
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <PiHandSwipeRight size={50} className="d-xxl-none finger"/>
    </div>
  )
}

export default ExploreByTypes