import Spacer from '@/components/common/misc/spacer'
import CategoriesList from '@/components/dashboard/categories/category-list';
import DashboardHeader from '@/components/dashboard/common/dashboard-header/header'
import { getAllCategoriesByPageForAuth } from '@/services/categories-service';
import React from 'react'

const DashboardCategoriesPage = async ({ searchParams, params }) => {

  const { q, page } = searchParams;

    const res = await getAllCategoriesByPageForAuth(q, page)
    const data = await res.json();

    if(!res.ok) throw new Error(data.message);
  
  return (
    <>
      <DashboardHeader title="Category"/>
      <Spacer height={25}/>
      <div className='container'>
        <CategoriesList data={data} />
      </div>
    </>
  )
}

export default DashboardCategoriesPage