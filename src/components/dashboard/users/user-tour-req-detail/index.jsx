import React from 'react'
import UserTourRequestToolbar from './user-tour-request-toolbar'
import UserTourTequestPropertyCell from './property-cell'
import DataTable, { Column } from '@/components/common/data-table/data-table'
import moment from 'moment'

const UserTourRequestDetail  = ({dataTourRequests,userId}) => {

    const handleProperty = (row) => { 
      return <UserTourTequestPropertyCell row={row}/>
   }
  
   const handleStatus = (row) => { 
    const {tourReqStatus} = row;
    const statusStyle = {
      backgroundColor: tourReqStatus === "PENDING"
      ? "#951763"
      : tourReqStatus === "CANCELED" 
      ? "red"
      : tourReqStatus === "DECLINED"
      ? "grey"
      : "green",
      color: "white"
    };

    return (
      <div className='w-100 d-flex align-items-center justify-content-between justify-content-lg-center '>
        <span className='d-lg-none'>Status : </span>
        <span className='badge p-2' 
        style={statusStyle}
        >{tourReqStatus}</span>
      </div>
    )
   }

     const handleCustomer = (row) => { 
      const {guestUserName} = row;
  
      return (
        <div className='w-100 d-flex align-items-center justify-content-between'>
          <span className='d-lg-none'>Customer : </span>
          <span >{guestUserName}</span>
        </div>
      )
     }
  
     const handleDate = (row) => { 
      const {tourDate} = row
  
      let tourRequestDate = moment(`${tourDate}`).format('ll') 
  
      return (
        <div className='d-flex align-items-center justify-content-between w-100'>
          <span className='d-lg-none '>Tour Request Date : </span>
          <span>{tourRequestDate}</span>
        </div>
      )
      }

      const handleTime = (row) => { 
        const {tourTime} = row
        const fixedTourTime=tourTime.slice(0,5)
        return (<div className='d-flex align-items-center justify-content-between w-100'>
        <span className='d-lg-none '>Tour Request Time : </span>
        <span>{fixedTourTime}</span>
      </div>)
       }
  
      const handleToolbar = (row) => { 
  
        return <UserTourRequestToolbar userId={userId} row={row}/>
       }
  
  return (
  <div className='container'>
  <DataTable 
          dataSource={dataTourRequests?.content ? dataTourRequests?.content : []}
          dataKey="id"
          // pagination={true}
          // totalPages={totalPages}
          // pageNumber={number}
          // pageSize={size}
          >
          <Column title="Property" template={handleProperty}/>
          <Column title="Customer" template={handleCustomer}/>
          <Column title="Status" template={handleStatus}/>
          <Column title="Tour Request Date" template={handleDate}/>
          <Column title="Tour Request Time" template={handleTime} />
          <Column title="Action" template={handleToolbar}/>
      </DataTable>
  </div>
  )
}

export default UserTourRequestDetail 