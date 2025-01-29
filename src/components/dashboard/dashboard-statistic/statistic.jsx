import Image from "next/image";
import React from "react";
import "./style.scss";

const DashboardStatistic = ({ title, image, data }) => {
  let count;
  switch (title) {
    case "Customer":
      count = data["userAmount"];
      break;

    case "Categories":
      count = data["categoryAmount"];
      break;

    case "Adverts":
      count = data["advertAmount"];
      break;

    case "Advert Types":
      count = data["advertTypeAmount"];
      break;

    case "Tour Requests":
      count = data["tourRequestAmount"];
      break;

    default:
      //If the count variable is coming as -10, there is an error.
      count = -10;
      break;
  }

  return (
    <div className="statistic-col">
      <div className="statistic-card">
        <div>
          <span></span>
          <h3>{title}</h3>
        </div>
        <p>{count}</p>
      </div>
      <Image
        src={`/images/dashboard/${image}`}
        width={120}
        height={110}
        alt={title}
      />
    </div>
  );
};

export default DashboardStatistic;