"use client"
import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import React from 'react'

const ErrorPage = () => {
  return (
    <div className='container'>
      <PageHeader title="Not Found"/>
      <Spacer height={50}/>
    </div>
  )
}

export default ErrorPage