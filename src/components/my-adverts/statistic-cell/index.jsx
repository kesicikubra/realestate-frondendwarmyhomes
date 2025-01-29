import React from "react";
import { FaRegEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { MdOutlinePlace } from "react-icons/md";

const MyAdvertsStatisticCell = ({ row }) => {
  const {  view_count, favorite_number, tour_request_number } = row;

  return (
    <div className="w-100 d-lg-flex align-items-center justify-content-center flex-column text-info">
      <p className=" d-flex align-items-center justify-content-between flex-row">
        <span className="d-lg-none">View : </span>
        <span>
          <FaRegEye /> {view_count}
        </span>
      </p>
      <p className="d-flex align-items-center justify-content-between flex-row">
        <span className="d-lg-none">Like : </span>
        <span>
          <FaHeart /> {favorite_number}
        </span>
      </p>
      <p className="d-flex align-items-center justify-content-between flex-row">
        <span className="d-lg-none">Tour : </span>
        <span>
          <MdOutlinePlace /> {tour_request_number}
        </span>
      </p>
    </div>
  );
};

export default MyAdvertsStatisticCell;
