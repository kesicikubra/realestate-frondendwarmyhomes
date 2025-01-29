import Spacer from '@/components/common/misc/spacer'
import EditAdvertTypesForm from '@/components/dashboard/advert-types/edit-advert-types-form'
import DashboardHeader from '@/components/dashboard/common/dashboard-header/header'
import { getAdvertTypeById } from '@/services/advert-type-service'
import React from 'react'

const EditAdvertTypePage =async ({params}) => {
 
    const res = await getAdvertTypeById(params.id);
	const data = await res.json();
 
	if (!res.ok) {
		throw new Error(data.message);
	}
  return (
    <>
    <DashboardHeader title="Advert Type / Edit"/>
    <Spacer/>
    <div className="container">
        <EditAdvertTypesForm data={data.object}/>
    </div>
    </>
  )
}

export default EditAdvertTypePage