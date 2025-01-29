import React from 'react'
import DataTable, { Column } from '../common/data-table/data-table'
import MyFAvoriteAdvertsToolbar from './my-favorites-toolbar'
import MyFavoriteAdvertsPropertyCell from './property-cell'

const MyFavoriteAdvertsList = ({data}) => {


    const { totalPages, size, number, content } = data.object

    const handleProperty = (row) => { 
        return <MyFavoriteAdvertsPropertyCell row={row}/>
     }

    const handleToolbar = (row) => { 
        return <MyFAvoriteAdvertsToolbar row={row}/>
    }
  
  return (
    <DataTable 
            dataSource={content ? content : []}
            dataKey="id"
            pagination={true}
            totalPages={totalPages}
            pageNumber={number}
            pageSize={size}
            >
            <Column title="Property" template={handleProperty}/>
            <Column title="Category" fields="category_title"/>
            <Column title="Type" fields="advert_type"/>
            <Column title="Action" template={handleToolbar}/>
        </DataTable>
  )
}

export default MyFavoriteAdvertsList