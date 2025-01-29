import Spacer from '@/components/common/misc/spacer'
import DashboardHeader from '@/components/dashboard/common/dashboard-header/header'
import UsersList from '@/components/dashboard/users/users-list';
import { getAllUsersByPageForAdmin } from '@/services/users-service';
import React from 'react'

const DashboardUsersPage =async ({searchParams}) => {
  const {q, page} = searchParams;

  const res = await getAllUsersByPageForAdmin(q, page);
  const data = await res.json();

  if(!res.ok) throw new Error(data.message);
  return (
    <>
      <DashboardHeader title="Users"/>
      <Spacer height={25}/>
      <div className="container">
        <UsersList data={data.object}/>
      </div>
      <Spacer height={25}/>
    </>
  )
}

export default DashboardUsersPage