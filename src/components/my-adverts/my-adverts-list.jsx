import React from 'react'
import DataTable, { Column } from '../common/data-table/data-table'
import MyAdvertsStatisticCell from './statistic-cell'
import MyAdvertsToolbar from './my-adverts-toolbar'
import moment from 'moment'
import MyAdvertsPropertyCell from './property-cell'

const MyAdvertsList = ({data}) => {

    const { totalPages, size, number, content } = data.object

    const handleProperty = (row) => { 
        return <MyAdvertsPropertyCell row={row}/>
     }

     const handleStatistic = (row) => { 

        return <MyAdvertsStatisticCell row={row}/>
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

          return <MyAdvertsToolbar row={row}/>
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
            <Column title="Date Publish" template={handleDate}/>
            <Column title="Status" template={handleStatus}/>
            <Column title="View/Like/Tour" template={handleStatistic} />
            <Column title="Action" template={handleToolbar}/>
        </DataTable>
  )
}

export default MyAdvertsList