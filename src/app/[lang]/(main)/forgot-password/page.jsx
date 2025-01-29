import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import ForgotPassword from '@/components/forgot-password/forgot-password'
import React from 'react'

const ForgotPasswordPage = () => {
  return (
    <div className='container'>
        <PageHeader title="Forgot Password"/>
        <Spacer height={100}/>
        <ForgotPassword/>
        <Spacer height={100}/>
    </div>
  )
}

export default ForgotPasswordPage