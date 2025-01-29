import Spacer from '@/components/common/misc/spacer'
import AdvertTypesList from '@/components/dashboard/advert-types/advert-types-list'
import DashboardHeader from '@/components/dashboard/common/dashboard-header/header'
import { getAllAdvertTypes } from '@/services/advert-type-service'
import React from 'react'

const DashboardAdvertTypesPage = async ({ searchParams, params }) => {
  let { qs } = searchParams

  if(qs === undefined) qs = "";
  
 
    const res = await getAllAdvertTypes(qs)
    const data = await res.json();

    if(!res.ok) throw new Error(data.message);

  return (
    <>
      <DashboardHeader title="Advert Type"/>
      <Spacer height={25}/>
      <div className="container">
        <AdvertTypesList data={data} params={params}/>
      </div>
    </>
  )
}

export default DashboardAdvertTypesPage