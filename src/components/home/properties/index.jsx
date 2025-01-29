"use client";
import React from "react";
import "./style.scss";
import data from "./propertiesData.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import AdvertCard from "@/components/common/cards/adver-card/advert-card";
import Spacer from "@/components/common/misc/spacer";
import { useDictionary } from "@/helpers/providers/lang-switcher-provider";

const PropertiesSection = async({ popularData}) => {
  const t =await useDictionary();
  return (
    <div className="properties-section container">
      <h2>{t.home.discoverPopularProperties}</h2>
      <h6>{t.home.featuredProperties}</h6>
      <div className="row">
        <Spacer height={50} />
        <Swiper
          modules={[Grid, Pagination, Autoplay]}
          slidesPerView={3}
          grid={{
            rows: 2,
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
                rows: 1,
              },
            },
            768: {
              slidesPerView: 2,
              grid: {
                rows: 1,
              },
            },
            992: {
              slidesPerView: 3,
              grid: {
                rows: 1,
              },
            },
            1200: {
              slidesPerView: 3,
              grid: {
                rows: 2,
              },
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {popularData?.map((item) => (
            <SwiperSlide key={item.id}>
              <AdvertCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PropertiesSection;
