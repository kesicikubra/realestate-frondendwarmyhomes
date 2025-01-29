import Spacer from '@/components/common/misc/spacer'
import DashboardHeader from '@/components/dashboard/common/dashboard-header/header'
import ContactMessageDetail from '@/components/dashboard/contact/contact-message-detail/contact-message-detail'
import { getMessageById } from '@/services/contact-messages-service'
import React from 'react'

const ContactMessageDetailPage = async ({ params }) => {

    const res = await getMessageById(params.id);
    const data = await res.json();
    
    if(!res.ok) throw new Error(data.message)

  return (
    <>
        <DashboardHeader title="Contact Messages"/>
        <Spacer/>
        <div className='container'>
            <ContactMessageDetail data={data}/>
        </div>
    </>
  )
}

export default ContactMessageDetailPage