import Spacer from '@/components/common/misc/spacer';
import PageHeader from '@/components/common/page-header'
import EditAdvertForm from '@/components/my-adverts/edit-advert';
import EditImageAndTourRequest from '@/components/my-adverts/edit-image-and-tours/editImageAndTourRequest';
import { getCities, getCountries, getDistricts } from '@/services/address-controller-service';
import { getAdvertByIdFromAuth } from '@/services/advert-service'
import { getAllAdvertTypes } from '@/services/advert-type-service';
import { getAllCategoriesWithoutPageForAnonymous } from '@/services/categories-service';
import React from 'react'

const MyPropertiesEditPage = async ({params}) => {
  

  const advertTypesData =( await getAllAdvertTypes("")).json();
  const countriesData =( await getCountries()).json();
  const cityData =( await getCities()).json();
  const districtData =( await getDistricts()).json();
  const categoriesData=( await getAllCategoriesWithoutPageForAnonymous("")).json();
  const advertByIdData =(await getAdvertByIdFromAuth(params.id)).json();
 

  const [advertTypes, countries, cities, districts, categories, advertById] = await Promise.all( [advertTypesData, countriesData, cityData, districtData,categoriesData, advertByIdData] )
 console.log(advertByIdData)
  return (
    <div className='container'>
        <PageHeader title={advertById?.object?.title}/>
        <Spacer/>
        <EditAdvertForm 
            advertTypes={advertTypes?.object}
            // countries={countries?.object}
            cities={cities?.object}
            districts={districts?.object}
            categories={categories?.object?.content}
            advertById={advertById.object}
            />
        <Spacer/>
        <EditImageAndTourRequest advertById={advertById.object}/>
        <Spacer/>
    </div>
  )
}

export default MyPropertiesEditPage