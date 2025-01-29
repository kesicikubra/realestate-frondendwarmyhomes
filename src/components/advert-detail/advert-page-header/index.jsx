import React from "react";
import "./style.scss";
import { MdOutlinePlace } from "react-icons/md";
import { CgTag } from "react-icons/cg";
import { FaRegClock } from "react-icons/fa";
import { GiEyeOfHorus, GiEyeTarget } from "react-icons/gi";
import { CiMoneyBill } from "react-icons/ci";
import moment from "moment";

const PageHeaderDetail = ({dataAdvert}) => {
  
    const { title, city, country, advert_type, view_count, create_at, price } = dataAdvert
    let createdAdvertTime=moment(create_at).fromNow()
  
    return (
        <div className="advert-page-header">
            <div className="advert-header-left">
                <h1>{title}</h1>
                <div className="advert-info">
                <span><MdOutlinePlace /> {city}, {country}</span>
                <span><CgTag /> {advert_type?.title}</span>
                <span><FaRegClock /> {createdAdvertTime}</span>
                <span><GiEyeTarget /> {view_count}</span>
                </div>
            </div>
            <div className="advert-header-right">
                <span><CiMoneyBill/>${price}</span>
            </div>
        </div>
    );
};

export default PageHeaderDetail;

