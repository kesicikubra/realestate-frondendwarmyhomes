import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import UpdateTourRequestForm from '@/components/tour-requests/tour-request-detail'
import { getAuthCustomersTourRequestWithId } from '@/services/tour-request-service'
import React from 'react'


const TourRequestDetailPage = async (searchParams) => {
    const res = await getAuthCustomersTourRequestWithId(searchParams.searchParams.id);
    const data = await res.json();
  
  return (
    <div className='container'>
        <PageHeader title="My Tour Requests"/>
        <Spacer/>
        <UpdateTourRequestForm data={data.object} ownerName={searchParams.searchParams.ownerUserName}/>
        <Spacer/>
    </div>
  )
}

export default TourRequestDetailPage