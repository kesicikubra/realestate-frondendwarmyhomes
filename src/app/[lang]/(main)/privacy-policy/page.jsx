import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import PrivacyPolicyDetails from '@/components/privacy-policy'
import React from 'react'

const PrivacyPolicyPage = () => {
  return (
    <div className='container'>
        <PageHeader title="Privacy Policy"/>
        <Spacer/>
        <PrivacyPolicyDetails/>
        <Spacer/>
    </div>
  )
}

export default PrivacyPolicyPage