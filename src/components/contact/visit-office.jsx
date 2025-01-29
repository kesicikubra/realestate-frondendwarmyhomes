import Image from "next/image";
import React from "react";
import "./visit-office.scss";
import { getDictionary } from "@/dictionaries/dictionaries";

const VisitOffice = async ({params}) => {
  const t =await getDictionary(params);


  return (
    <div className="visit-office">
      <div className="text-center visit-header">
        <h2>{t.contact.visitOffice}</h2>
        <p>{t.contact.realtonText}</p>
      </div>
      <div className="d-md-flex align-items-center justify-content-around">
        <div className=" d-flex flex-column justfy-content-center align-items-center "> 
            <p>
                <Image src="/images/contact-icons/paris.svg" height={85} width={62} alt="eiffel tower"/>
            </p>
            <span>{t.contact.paris}</span>
            <span>1301 2nd Ave, Seattle, WA 98101</span>
            <span>(315) 905-2321</span>
        </div>
        <div className=" d-flex flex-column justfy-content-center align-items-center "> 
            <p>
                <Image src="/images/contact-icons/london.svg" height={85} width={62} alt="big ben"/>
            </p>
            <span>{t.contact.london}</span>
            <span>1301 2nd Ave, Seattle, WA 98101</span>
            <span>(315) 905-2321</span>
        </div>
        <div className=" d-flex flex-column justfy-content-center align-items-center "> 
            <p>
                <Image src="/images/contact-icons/istanbul.svg" height={85} width={62} alt="galata tower"/>
            </p>
            <span>{t.contact.istanbul}</span>
            <span>1301 2nd Ave, Seattle, WA 98101</span>
            <span>(315) 905-2321</span>
        </div>
      </div>
    </div>
  );
};

export default VisitOffice;
