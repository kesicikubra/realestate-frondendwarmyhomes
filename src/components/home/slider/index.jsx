import React from "react";
import slides from "@/helpers/data/slider.json";
import Image from "next/image";
import "./slider.scss";
import SearchBox from "../search-box";

const Slider = ({advertTypeData, categoryNamesData,t}) => {
  const sliderr=t.home.slider
  return (
    <div
      id="slider"
      className="carousel slide main-slider carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="7000"
    >
      <div className="carousel-indicators">
        {sliderr.map((item, index) => (
          <button
            key={item.id}
            type="button"
            data-bs-target="#slider"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {sliderr.map((item, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={item.id}
          >
            <Image
              src={`/images/slider/${item.image}`}
              width={1355}
              height={500}
              className="d-block w-100"
              alt={item.title}
            />
            <div className="carousel-caption">
              <h5>{item.title}</h5>
            </div>
          </div>
        ))}
        <SearchBox  advertTypeData = {advertTypeData} categoryNamesData={categoryNamesData}/>
      </div>
    </div>
  );
};

export default Slider;
