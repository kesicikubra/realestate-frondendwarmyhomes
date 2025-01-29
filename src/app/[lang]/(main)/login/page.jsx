import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import LoginForm from '@/components/login/login-form'


import React from 'react'

const LoginPage = () => {
  return (
    <div className='container'>
      <PageHeader title="Login"/>
      <Spacer/>
      <LoginForm/>
      <Spacer/>
    </div>
  )
}

export default LoginPage
