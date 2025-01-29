
import ChangePassword from '@/components/change-password/change-password'
import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import React from 'react'

const ChangePasswordPage = () => {
  return (
    <div className='container'>
        <PageHeader title="Change Password"/>
        <Spacer/>
        <ChangePassword/>
        <Spacer height={100}/>
    </div>
  )
}

export default ChangePasswordPage