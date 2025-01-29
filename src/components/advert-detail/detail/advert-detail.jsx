"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./style.scss";
import Image from "next/image";
import GoogleMapPage from "@/components/advert-detail/detail/map/map.jsx";

const AdvertDetail = ({ dataAdvert }) => {
  console.log("data", dataAdvert)
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const {
    images,
    country,
    city,
    district,
    description,
    properties,
  } = dataAdvert;
  return (
    <div className="advert-detail-swiper">
      <div className="card">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {images.map((item) => (
            <SwiperSlide key={item.id}>
              <Image
                src={`data:image/jpeg;base64,${item.imageData}`}
                alt={item.id}
                width={877}
                height={457}

                className="swiper-image"

              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={25}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images.map((item) => (
            <SwiperSlide key={item.id}>
              <Image
                src={`data:image/jpeg;base64,${item.imageData}`}
                alt={item.id}
                width={877}
                height={457}
              
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="card">
        <h2>Description</h2>
        <p>{description}</p>
      </div>
      <div className="card">
        <h2>Details</h2>
        <div className="row">
          <div className="col">
            {properties?.slice(0,(properties.length/2)).map((item) => (
              <p key={item.key}>
                <span>{item.key}</span>
                <span>{item.value}</span>
              </p>
            ))}
          </div>
          <div className="col-2 d-none d-md-block"></div>
          <div className="col">
          {properties?.slice((properties.length/2),(properties.length)).map((item) => (
              <p key={item.value}>
                <span>{item.key}</span>
                <span>{item.value}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <h2>Location</h2>
        <div className="location">
          <p>Country : {country}</p>
          <p>City : {city}</p>
          <p>District : {district}</p>
        </div>
        <GoogleMapPage dataAdvert={dataAdvert} />
      </div>
    </div>
  );
};

export default AdvertDetail;
