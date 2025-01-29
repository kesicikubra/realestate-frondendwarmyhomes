import Link from 'next/link'
import React from 'react'
import "./style.scss"
import { config } from '@/helpers/config'
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { getDictionary } from '@/dictionaries/dictionaries';

const HelpSection = async({params}) => {
    const t = await getDictionary(params.lang)
  return (
    <div className='help-section'>
        <div className="row row-cols-1 row-cols-lg-2">
            <div className="col">
                <p>{t.home.needHelp}</p>
                <small>
                    {t.home.talkTo}
                </small>
            </div>
            <div className="col">
                <button className='btn btn-outline-success'>
                    <Link href="/contact">
                        {t.home.contactUs} <FaArrowUpRightFromSquare size={20}/>
                    </Link> 
                </button>
                <button className='btn btn-success'>
                <a className="nav-link" href={`tel:${config.contact.phone1}`}>
                    <BsFillTelephoneOutboundFill size={20} /> {t.home.contactUs}
                </a>
                </button>
            </div>
        </div>
    </div>
  )
}

export default HelpSection