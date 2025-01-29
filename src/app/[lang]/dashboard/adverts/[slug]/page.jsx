import Spacer from '@/components/common/misc/spacer';
import DashboardEditAdvertForm from '@/components/dashboard/admin-adverts/admin-edit-advert-form';
import DashboardEditAdvertPageSectionTabs from '@/components/dashboard/admin-adverts/admin-edit-advert-form/edit-advert-sections';
import DashboardEditAdvertFormUserInfoSection from '@/components/dashboard/admin-adverts/admin-edit-advert-form/user-info-section/user-info-section';
import DashboardHeader from '@/components/dashboard/common/dashboard-header/header'
import { getCities, getCountries, getDistricts } from '@/services/address-controller-service';
import { getAdvertByIdFromAdmin } from '@/services/advert-service'
import { getAllAdvertTypes } from '@/services/advert-type-service';
import { getAllCategoriesByPageForAnonymous } from '@/services/categories-service';
import React from 'react'

const DashboardAdvertEditPage = async ({searchParams}) => {

  const advertTypesData =( await getAllAdvertTypes("")).json();
  const countriesData =( await getCountries()).json();
  const cityData =( await getCities()).json();
  const districtData =( await getDistricts()).json();
  const categoriesData=( await getAllCategoriesByPageForAnonymous()).json();
  const advertData=( await getAdvertByIdFromAdmin(searchParams.id)).json();

  const [advertTypes, countries, cities, districts,categories, advert] = await Promise.all( [advertTypesData, countriesData, cityData, districtData, categoriesData,advertData] )

  return (
    <>
    <DashboardHeader title=" Adverts / Edit" />
    <Spacer/>
    <div className="container">
    <DashboardEditAdvertForm 
        advert={advert}
        advertTypes={advertTypes.object}
        categories={categories.object.content}
        // countries={countries.object}
        cities={cities.object}
        districts={districts.object}
        />
    <Spacer/>
    <DashboardEditAdvertFormUserInfoSection data={advert} />
    <Spacer/>
    <DashboardEditAdvertPageSectionTabs tourRequests={advert?.object}/>
    <Spacer/>
    </div>
    </>
  )
}

export default DashboardAdvertEditPage