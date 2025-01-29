import Spacer from '@/components/common/misc/spacer'
import NewAdvertTypesForm from '@/components/dashboard/advert-types/advert-types-form'
import DashboardHeader from '@/components/dashboard/common/dashboard-header/header'
import React from 'react'

const NewAdvertTypePage = () => {
  return (
    <>
    <DashboardHeader title="Advert Types / New"/>
    <Spacer/>
    <div className="container">
        <NewAdvertTypesForm/>
    </div>
    
    </>
  )
}

export default NewAdvertTypePage