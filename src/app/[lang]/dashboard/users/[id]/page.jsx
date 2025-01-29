import Spacer from '@/components/common/misc/spacer'
import DashboardHeader from '@/components/dashboard/common/dashboard-header/header'
import UserDetail from '@/components/dashboard/users/user-detail/user-detail'
import { getUserByIdForAdmin } from '@/services/users-service'
import React from 'react'
import UserDetailStatistic from './user-detail-stats'

const UserDetailPage = async ({ params }) => {

    const res = await getUserByIdForAdmin(params.id);
    const data = await res.json();
  console.log("data",data.object);
  return (
    <>
        <DashboardHeader title="User"/>
        <Spacer/>
        <div className='container'>
            <UserDetail data={data?.object?.content} userId={params.id}/>
        </div>
        <Spacer height={50}/>
        <UserDetailStatistic data={data?.object?.content}/>
    </>
  )
}

export default UserDetailPage