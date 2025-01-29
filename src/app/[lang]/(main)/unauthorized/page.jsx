import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import UnAuthorization from '@/components/errors/unauthorized'
import React from 'react'

const UnauthorizedPage = () => {
  return (
    <div className='container'>
        <PageHeader title="Unauthorized"/>
        <Spacer/>
        <UnAuthorization/>
        <Spacer/>
    </div>
  )
}

export default UnauthorizedPage