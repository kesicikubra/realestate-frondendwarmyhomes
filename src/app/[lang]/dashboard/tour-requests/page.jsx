import Spacer from '@/components/common/misc/spacer'
import DashboardHeader from '@/components/dashboard/common/dashboard-header/header'
import DashboardTourRequestsList from '@/components/dashboard/tour-requests/tour-requests-list';
import { getAdminsOrManagersAllTourRequest } from '@/services/tour-request-service';
import React from 'react'

const DashboardTourRequests = async({searchParams}) => {
  const {q, page} = searchParams;

  const res = await getAdminsOrManagersAllTourRequest(q, page);
  const data = await res.json();
  
  if(!res.ok) throw new Error(data.message);
  return (
    <>
      <DashboardHeader title="Tour Requests"/>
      <Spacer height={25}/>
      <div className="container">
        <DashboardTourRequestsList data={data.object}/>
      </div>
      <Spacer height={25}/>
    </>
  )
}

export default DashboardTourRequests