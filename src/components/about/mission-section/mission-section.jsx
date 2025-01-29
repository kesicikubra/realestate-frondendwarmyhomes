import Image from "next/image";
import React from "react";
import "./style.scss";
import { FaPenRuler, FaRecycle } from "react-icons/fa6";
import { getDictionary } from "@/dictionaries/dictionaries";

const MissionSection = async ({params}) => {
  const t =await getDictionary(params.lang);
  return (
    <div className="mission-section">

      <div className="row row-cols-1 row-cols-lg-2">

      <div className="col col-lg-6 col-xl-6">
          <Image
            src="/images/section-images/home.svg"
            width={644}
            height={430}
            alt="home"
            className="img-fluid"
          />
        </div>

        <div className="col col-lg-6 col-xl-6">
          <h4 className="mb-0">{t.about.missionToChange} </h4>
          <h4 className="m-0 mb-2">{t.about.viewRealEstate}</h4>
          <p className="text">{t.about.textAboutUs}
          </p>
          <div className="d-flex align-items-center justify-content-center gap-5">
            <div className=" d-flex flex-column justfy-content-center align-items-center ">    
              <p className="circle">
              <FaPenRuler />
              </p>
              <span>{t.about.modernArchitect}</span>
            </div>
            <div className=" d-flex flex-column justfy-content-center align-items-center ">
              <p className="circle">
              <FaRecycle />
              </p>
              <span>{t.about.greenBuilding}</span>
            </div> 
          </div>
          
        </div>

        

      </div>
    </div>
  );
};

export default MissionSection;
