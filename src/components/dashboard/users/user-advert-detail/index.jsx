import DataTable, { Column } from '@/components/common/data-table/data-table'
import React from 'react'
import UserAdvertsPropertyCell from './property-cell'
import UserAdvertsStatisticCell from './statistic-cell'
import UserAdvertsToolbar from './user-adverts-toolbar'
import moment from 'moment'
import Spacer from '@/components/common/misc/spacer'

const UserAdvertDetail  = ({dataAdverts,userId}) => {

  const handleProperty = (row) => { 
    return <UserAdvertsPropertyCell row={row}/>
 }

 const handleStatistic = (row) => { 

    return <UserAdvertsStatisticCell row={row}/>
  }

  const handleStatus = (row) => { 
    const {status} = row;

    return (
      <div className='w-100 d-flex align-items-center justify-content-between'>
        <span className='d-lg-none'>Status : </span>
        <span className='badge text-bg-primary p-2'>{status}</span>
      </div>
    )
   }
   

   const handleDate = (row) => { 
    const {create_at} = row

    let dateOfPublish = moment(`${create_at}`).format('L') 

    return (
      <div className='d-flex align-items-center justify-content-between w-100'>
        <span className='d-lg-none '>Date of Publish : </span>
        <span>{dateOfPublish}</span>
      </div>
    )
    
    }

    const handleToolbar = (row) => { 

      return <UserAdvertsToolbar userId={userId} row={row}/>
     }

return (
<>
<div className='container'>
<DataTable 
        dataSource={dataAdverts?.content ? dataAdverts?.content : []}
        dataKey="id"
        // pagination={true}
        // totalPages={totalPages}
        // pageNumber={number}
        // pageSize={size}
        >
        <Column title="Property" template={handleProperty}/>
        <Column title="Date Publish" template={handleDate}/>
        <Column title="Status" template={handleStatus}/>
        <Column title="View/Like/Tour" template={handleStatistic} />
        <Column title="Action" template={handleToolbar}/>
    </DataTable>
</div>
<Spacer/>
</>

  )
}

export default UserAdvertDetail 