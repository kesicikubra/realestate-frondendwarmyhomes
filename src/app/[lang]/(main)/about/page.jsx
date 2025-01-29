
import MissionSection from '@/components/about/mission-section/mission-section'
import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import HelpSection from '@/components/home/help'
import SellingSection from '@/components/home/selling-section'
import React from 'react'

const AboutPage = ({params}) => {

  return (
    <div className='container'>
      <PageHeader title="About Us"/>
      <Spacer/>
      <MissionSection params={params}/>
      <Spacer/>
      <SellingSection params={params}/>
      <Spacer height={100}/>
      <HelpSection params={params}/>
      <Spacer height={100}/>
    </div>
  )
}

export default AboutPage