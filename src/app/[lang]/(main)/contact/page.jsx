import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import Contact from '@/components/contact/contact'
import { wait } from '@/helpers/misc'
import React from 'react'
import { getDictionary } from "@/dictionaries/dictionaries";

const ContactPage = async ({params}) => {
const t=await getDictionary(params.lang)

  return (
    <div className='container'>
      <PageHeader title="Contact Us"/>
      <Spacer/>
      <Contact params={params} t={t} />
      <Spacer height={100}/>
    </div>
  )
}

export default ContactPage