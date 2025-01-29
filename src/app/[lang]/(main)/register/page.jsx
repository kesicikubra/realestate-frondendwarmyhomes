import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import RegisterForm from '@/components/register/register-form'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className='container'>
        <PageHeader title="Register"/>
        <Spacer height={25}/>
        <RegisterForm/>
        <Spacer/>
    </div>
  )
}

export default RegisterPage