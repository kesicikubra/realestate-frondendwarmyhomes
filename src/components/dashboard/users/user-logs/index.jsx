import DataTable, { Column } from '@/components/common/data-table/data-table'
import React from 'react'

const UserLogDetail  = ({dataLogs}) => {

  return (
    <>
    <div className="container">
        <DataTable
          dataSource={dataLogs?.content ? dataLogs?.content : []}
          dataKey="id"
          // pagination={true}
          // totalPages={totalPages}
          // pageNumber={number}
          // pageSize={size}
        >
          <Column title="Action" fields="log" />
          <Column title="Date" fields="createAt" />
        </DataTable>
      </div>
    </>
  )
}

export default UserLogDetail 