import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import TermsOfUseDetails from '@/components/terms-of-use'
import React from 'react'

const TermsOfUsePage = () => {
  return (
    <div className='container'>
        <PageHeader title="Terms Of Use"/>
        <Spacer/>
        <TermsOfUseDetails/>
        <Spacer/>
    </div>
  )
}

export default TermsOfUsePage