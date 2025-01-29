import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import UserTourRequestsSections from '@/components/tour-requests'
import { getAuthenticatedCustomersGuestTourRequests, getAuthenticatedCustomersOwnerTourRequests } from '@/services/tour-request-service'
import React from 'react'

const TourRquestsPage = async () => {

  const ownerRes = (await getAuthenticatedCustomersOwnerTourRequests(" ")).json();
  const guestRes = (await getAuthenticatedCustomersGuestTourRequests(" ")).json();
  const [ownerData, guestData] = await Promise.all([ownerRes, guestRes]);

  return (
    <div className='container'>
        <PageHeader title="My Tour Requests"/>
        <Spacer/>
        <UserTourRequestsSections  
            ownerData={ownerData}
            guestData={guestData}
            />
        <Spacer/>
    </div>
  )
}

export default TourRquestsPage