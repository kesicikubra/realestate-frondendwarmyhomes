import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import AddProfileImageSection from '@/components/my-profile/profile-image'
import UpdateForm from '@/components/my-profile/update-form'
import { getUserByAuth } from '@/services/my-profile-service'
import React from 'react'

const MyProfilePage = async({params}) => {

  const res=await getUserByAuth(params);
  const data= await res.json();

  return (
    <div className='container'>
        <PageHeader title="My Profile"/>
        <Spacer/>
        <div className="row">
          <div className="col-12 col-lg-6">
            <AddProfileImageSection photoResponse={data.object.photoResponse}/>
          </div>
          <div className="col-12 col-lg-6">
            <UpdateForm data={data.object} />
          </div>
        </div>
        <Spacer/>
    </div>
  )
}

export default MyProfilePage