import Image from "next/image";
import React from "react";
import "./style.scss";
import { getDictionary } from "@/dictionaries/dictionaries";

const SellingSection =async ({params}) => {
  const t =await getDictionary(params.lang)
  return (
    <div className="selling-section">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="col col-lg-7 col-xl-6">
          <p>{t.home.letsFind}</p>
          <div className="selling-card">
            <div className="sell-card">
                <div className="circle">
                  <Image src="/images/icons/Sale53x53.svg" width={53} height={53} alt="sale coupon"/>
                </div>
                <div className="text">
                  <p>{t.home.techDriven}</p>
                  <p className="sub-text">{t.home.realEstate}</p>
                </div>
            </div>
            <div className="sell-card">
                <div className="circle">
                  <Image src="/images/icons/AirQualityControl57x52.svg" width={57} height={52} alt="air quality"/>
                </div>
                <div className="text">
                  <p>{t.home.sustainabilityMatters}</p>
                  <p className="sub-text">{t.home.greenBuilding}</p>
                </div>
            </div>
            <div className="sell-card">
                <div className="circle">
                  <Image src="/images/icons/Vault55x55.svg" width={55} height={55} alt="sale coupon"/>
                </div>
                <div className="text">
                  <p>{t.home.remoteWorkImpact}</p>
                  <p className="sub-text">{t.home.changingWork}</p>
                </div>
            </div>
          </div>
        </div>
        <div className="col col-lg-5 col-xl-6">
          <Image
            src="/images/section-images/selling-section.svg"
            width={713}
            height={612}
            alt="a happy couple"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default SellingSection;
