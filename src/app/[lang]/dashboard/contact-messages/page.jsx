import Spacer from '@/components/common/misc/spacer'
import DashboardHeader from '@/components/dashboard/common/dashboard-header/header'
import { getAllMessagesByPage } from '@/services/contact-messages-service'
import React from 'react'
import ContactMessagesList from '@/components/dashboard/contact/contact-messages-list'

const DashboardContactMessagesPage = async ({ searchParams }) => {
  const {q, page, status} = searchParams;

  const res = await getAllMessagesByPage(q, page, status);
  const data = await res.json();

  if(!res.ok) throw new Error(data.message);

  return (
    <>
      <DashboardHeader title="Contact Messages"/>
      <Spacer height={25} />
      <div className="container">
        <ContactMessagesList data={data}/>
      </div>
      <Spacer height={25}/>
    </>
  )
}

export default DashboardContactMessagesPage