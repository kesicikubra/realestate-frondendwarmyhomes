import DataTable, { Column } from '@/components/common/data-table/data-table'
import React from 'react'
import DashboardEditAdvertTourRequestsToolbar from './edit-advert-tour-requests-toolbar';
import moment from 'moment';

const DashboardEditAdvertFormTourRequestsList = ({tourRequests}) => {

  const handleGuestName = (row) => {
    const{guestUserName}=row
    return (
      <div className="d-flex align-items-center justify-content-between justify-content-md-start">
        <span className="d-lg-none me-3">Guest:</span>
        <span>{guestUserName}</span>
      </div>
    );
  };

  const handleStatus = (row) => {
    const { tourReqStatus } = row;
    const statusStyle = {
      backgroundColor:
      tourReqStatus === "PENDING"
      ? "#951763"
      : tourReqStatus === "CANCELED" 
      ? "red"
      : tourReqStatus === "DECLINED"
      ? "grey"
      : "green",
      color: "white",
    };

    return (
      <div className="w-100 d-flex align-items-center justify-content-between justify-content-lg-center ">
        <span className="d-lg-none">Status : </span>
        <span className="badge p-2" style={statusStyle}>
          {tourReqStatus}
        </span>
      </div>
    );
  };

      const handleTourDate = (row) => {
        const { tourDate } = row;
        const fixedTourDate=moment(tourDate).format("LL")
    
        return (
          <div className="w-100 d-flex align-items-center justify-content-between">
            <span className="d-lg-none">Tour Request Date : </span>
            <span >{fixedTourDate}</span>
          </div>
        );
      };

      const handleTourTime = (row) => {
        const { tourTime } = row;
        const fixedTourTime=tourTime.slice(0,5)
    
        return (
          <div className="w-100 d-flex align-items-center justify-content-between">
            <span className="d-lg-none">Tour Request Time : </span>
            <span >{fixedTourTime}</span>
          </div>
        );
      };

      const handleToolbar = (row) => {
        return <DashboardEditAdvertTourRequestsToolbar row={row} />;
      };

  return (
    <div className='container'>
        <DataTable
        dataSource={tourRequests?.tourRequest ? tourRequests?.tourRequest : []}
        dataKey="id"
        // pagination={true}
        // totalPages={totalPages}
        // pageNumber={number}
        // pageSize={size}
      >
        <Column title="Guest" template={handleGuestName} />
        <Column title="Status" template={handleStatus} />
        <Column title="Tour Date" template={handleTourDate} />
        <Column title="Tour Time" template={handleTourTime} />
        <Column title="Action" template={handleToolbar} />
      </DataTable>
    </div>
  )
}

export default DashboardEditAdvertFormTourRequestsList