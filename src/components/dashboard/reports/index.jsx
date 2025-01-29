import React from 'react'
import "./style.scss"
import UserReportForm from './user-report'
import AdvertsReportForm from './adverts-report'
import Spacer from '@/components/common/misc/spacer'
import MostPopularReportForm from './properties-report'
import TourRequestReportForm from './tour-request-report'

const ReportFormsSection = ({categories, advertTypes}) => {
  return (
    <div className='container reports-container w-75'>
        <AdvertsReportForm
            categories={categories}
            advertTypes={advertTypes}/>
        <Spacer height={25}/>
        <MostPopularReportForm/>
        <Spacer height={25}/>
        <UserReportForm/>
        <Spacer height={25}/>
        <TourRequestReportForm/>
    </div>
  )
}

export default ReportFormsSection