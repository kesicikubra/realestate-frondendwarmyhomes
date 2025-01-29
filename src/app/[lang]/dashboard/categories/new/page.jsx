import Spacer from '@/components/common/misc/spacer'
import NewCategoryForm from '@/components/dashboard/categories/new-categories-form'
import DashboardHeader from '@/components/dashboard/common/dashboard-header/header'
import React from 'react'

const NewCategoryPage = () => {
  return (
    <>
        <DashboardHeader title="Categories / New"/>
        <Spacer/>
        <div className='container'>
            <NewCategoryForm/>
        </div>
    </>
  )
}

export default NewCategoryPage