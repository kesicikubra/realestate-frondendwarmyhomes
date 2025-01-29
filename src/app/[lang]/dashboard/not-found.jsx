import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import NotFound from '@/components/errors/not-found-section'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='container'>
      <PageHeader title="Not Found"/>
      <Spacer/>
      <NotFound/>
      <Spacer/>
    </div>
  )
}

export default NotFoundPage