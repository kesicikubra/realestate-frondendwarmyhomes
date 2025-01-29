import NewAdvertForm from '@/components/add-new-advert'
import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import { getCities, getCountries, getDistricts } from '@/services/address-controller-service'
import { getAllAdvertTypes } from '@/services/advert-type-service'
import { getAllCategoriesByPageForAnonymous } from '@/services/categories-service'
import { getCategoryPropertyKeysById } from '@/services/category-property-service'
import React from 'react'

const AddPropertyPage = async ({params}) => {

  const advertTypesData =( await getAllAdvertTypes("")).json();
  const countriesData =( await getCountries()).json();
  const cityData =( await getCities()).json();
  const districtData =( await getDistricts()).json();
  const categoriesData=( await getAllCategoriesByPageForAnonymous()).json();
  const categoryPropertiesData=( await getCategoryPropertyKeysById(1)).json();
  
  const [advertTypes, countries, cities, districts,categories,categoryProperties] = await Promise.all( [advertTypesData, countriesData, cityData, districtData, categoriesData,categoryPropertiesData] )
  return (

    <div className='container' >
        <PageHeader title="Add Property" />
        <Spacer height={50}/>
        <NewAdvertForm 
            advertTypes={advertTypes.object}
            countries={countries.object}
            cities={cities.object}
            districts={districts.object}
            categories={categories.object.content}
            />
        <Spacer/>
    </div>
  )
}

export default AddPropertyPage