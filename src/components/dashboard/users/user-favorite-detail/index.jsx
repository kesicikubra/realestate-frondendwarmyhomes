import DataTable, { Column } from '@/components/common/data-table/data-table'
import React from 'react'
import UserFavoritePropertiesCell from './property-cell'
import UserFavoreitesToolbar from './user-tour-request-toolbar'

const UserFavoriteDetail  = ({dataFavorites,userId}) => {
  const handleProperty = (row) => { 
    return <UserFavoritePropertiesCell row={row}/>
 }
 
    const handleToolbar = (row) => { 

      return <UserFavoreitesToolbar userId={userId} row={row}/>
     }

     const handleType = (row) => { 
      const {advert_type} = row;
  
      return (
        <div className='w-100 d-flex align-items-center justify-content-between'>
          <span className='d-lg-none'>Type : </span>
          <span className='p-2'>{advert_type}</span>
        </div>
      )
     }

     const handleCategory = (row) => { 
      const {category_title} = row;
      
      return (
        <div className='w-100 d-flex align-items-center justify-content-between'>
          <span className='d-lg-none'>Category : </span>
          <span className=' p-2'>{category_title}</span>
        </div>
      )
     }

return (
<div className='container'>
<DataTable 
        dataSource={dataFavorites?.content ? dataFavorites?.content : []}
        dataKey="id"
        // pagination={true}
        // totalPages={totalPages}
        // pageNumber={number}
        // pageSize={size}
        >
        <Column title="Property" template={handleProperty}/>
        <Column title="Category" template={handleCategory}/>
        <Column title="Type" template={handleType}/>
        <Column title="Action" template={handleToolbar}/>
    </DataTable>
</div>
  )
}

export default UserFavoriteDetail 