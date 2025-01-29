"use client"
import React, { useEffect, useState } from "react";
import "./style.scss";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { i18n } from "@/middleware";
import { setCookie } from "cookies-next";
import Image from "next/image";

const LanguageSwitcher = () => {
  const params=useParams()
  const pathName = usePathname()
  const [selectedLang, setSelectedLang] = useState(params.lang)
  const [selecteCountryFlag, setSelectedCountryFlag] = useState(params.lang)

  const redirectedPathName = (locale) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const handleSelctedLanguage = (lang) => { 
    setCookie('NEXT_LOCALE', lang);
    let upperCaseLang = lang.toUpperCase()
    setSelectedLang(upperCaseLang)
    setSelectedCountryFlag(lang)
   }
  

  return (
    <div className="dropdown ms-3 lang-switcher-dropdown">
      <button
        className="btn btn-outline-primary rounded-5 dropdown-toggle mb-1"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {/* {selectedLang} */}
        <Image src={`/images/flags-icons/${selecteCountryFlag}.svg`}  alt={`${selecteCountryFlag}-flag`} width={25} height={25}/>
      </button>
      <ul className="dropdown-menu">
      {i18n.locales.map(locale => {
        return (
          <li key={locale.toUpperCase()} className="lang-switcher">
            <Link
              href={redirectedPathName(locale)}
              className='dropdown-item px-3 py-2'
              onClick={()=>handleSelctedLanguage(locale)}
            >
              {locale.toUpperCase()}
              <Image src={`/images/flags-icons/${locale}.svg`} alt={`${locale}-flag`} width={25} height={25}/>
            </Link>
          </li>
        )
      })}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;