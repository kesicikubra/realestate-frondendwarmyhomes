import Image from "next/image";
import React from "react";
import "./style.scss";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";
import { getDictionary } from "@/dictionaries/dictionaries";

const RegisterSection = async({params}) => {
 
  const t = await getDictionary(params.lang)
  return (
    <div className="register-section">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="col">
          <p>{t.home.getYour}</p>
          <small>
            {t.home.turnYour} &apos;{t.home.getYour}&apos; 
            {t.home.whereYour}
          </small>
          <button className="btn btn-success text-light">
            <Link href="/register">
            {t.home.registerNow} <GoArrowUpRight size={36}/>
            </Link>
          </button>
        </div>
        <div className="col">
          <Image
            src="/images/section-images/register.svg"
            width={594}
            height={379}
            alt="house"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterSection;
