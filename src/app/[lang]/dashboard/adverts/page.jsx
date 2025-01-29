import React from 'react'
import DashboardHeader from '@/components/dashboard/common/dashboard-header/header'
import Spacer from '@/components/common/misc/spacer'
import DashboardAdminAdvertList from '@/components/dashboard/admin-adverts/admin-adverts-list'
import { getAdvertsFromAdmin } from '@/services/advert-service'
import { getAllAdvertTypes } from '@/services/advert-type-service'
import { getAllCategoriesWithoutPageForAnonymous } from '@/services/categories-service'

const DashboardAdvertsPage = async ({searchParams, params}) => {

  const {q, status, category_id, advert_type_id, page} = searchParams;
  const allAdvertsData = (await getAdvertsFromAdmin(q,category_id,advert_type_id,status, page)).json();
  const allCategoriesData = (await getAllCategoriesWithoutPageForAnonymous("")).json();
  const allAdvertTypesData = (await getAllAdvertTypes("")).json();
  
  const [advertData,categoriesData,advertTypesData] = await Promise.all([ allAdvertsData, allCategoriesData,allAdvertTypesData ]);


  return (
    <>
    <DashboardHeader title="Adverts"/>
    <Spacer height={25}/>
    <div className="container">
      <DashboardAdminAdvertList advertData={advertData} categoriesData={categoriesData?.object.content} advertTypesData={advertTypesData?.object}/>
    </div>
    <Spacer height={25}/>
  </>
  )
}

export default DashboardAdvertsPage