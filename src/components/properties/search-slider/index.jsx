"use client";
import React from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import AdvertCardProperties from "../advert-card/advert-card";

const SearchSlider = ({allAdverts}) => {

  return (
    <div className="col-12 col-md-6 col-lg-9">
      <div className="properties-section container">
        <div className="row">
          <Swiper
            modules={[Grid, Pagination, Autoplay]}
            slidesPerView={2}
            grid={{
              rows: 5,
            }}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              // Küçük ekranlarda sadece bir satır göster
              250: {
                slidesPerView: 1,
                grid: {
                  rows: 1,
                },
              },
              576: {
                slidesPerView: 1,
                grid: {
                  rows: 2,
                },
              },
              768: {
                slidesPerView: 1,
                grid: {
                  rows: 3,
                },
              },
              992: {
                slidesPerView: 2,
                grid: {
                  rows: 5,
                },
              },
              1200: {
                slidesPerView: 2,
                grid: {
                  rows: 5,
                },
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {allAdverts?.content?.map((item) => (
              <SwiperSlide key={item.id}>
                <AdvertCardProperties {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SearchSlider;
