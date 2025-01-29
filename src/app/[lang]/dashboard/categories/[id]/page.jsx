import Spacer from '@/components/common/misc/spacer'
import EditCategoryForm from '@/components/dashboard/categories/edit-categories-form'
import DashboardHeader from '@/components/dashboard/common/dashboard-header/header'
import { getCategoryById } from '@/services/categories-service'
import { getCategoryPropertyKeysById } from '@/services/category-property-service'
import React from 'react'

const EditCategoryPage = async({params}) => {
  const categoryData = (await getCategoryById(params.id)).json();
  const propertyKeyData = (await getCategoryPropertyKeysById(params.id)).json();

  const [ categories, propertKeys] = await Promise.all( [categoryData, propertyKeyData] )

  
  return (
    <>
        <DashboardHeader title="Categories / Edit"/>
        <Spacer/>
        <div className="container">
            <EditCategoryForm dataCategory={categories.object} dataPropertyKey={propertKeys.object}/>
        </div>
    </>
  )
}

export default EditCategoryPage