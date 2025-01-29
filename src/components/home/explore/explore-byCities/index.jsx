"use client"

import "./style.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Spacer from "@/components/common/misc/spacer";
import { PiHandSwipeRight } from "react-icons/pi";
import { useDictionary } from "@/helpers/providers/lang-switcher-provider";

const ExploreByCities =async ({cityData}) => {
  const t =await useDictionary();
  return (
    <div className="byCities">
      <h2>{t.home.exploreProperties}</h2>
      <h6>{t.home.byCities}</h6>
      <Spacer height={50}/>
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
          cityData?.map((item)=>(
            <SwiperSlide key={item.cityId}>
              <div className="cities">
                  <h4>{item.cityName}</h4>
                  <p>{item.amount} {t.home.properties}</p>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <PiHandSwipeRight size={50} className="d-xxl-none finger"/>
    </div>
  )
}

export default ExploreByCities