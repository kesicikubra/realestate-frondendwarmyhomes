import React from "react";
import DataTable, { Column } from "@/components/common/data-table/data-table";
import StatisticCell from "@/components/common/data-table/statistic-cell";
import AdminAdvertPropertyCell from "./admin-advert-property-cell/admin-advert-propertyCell";
import moment from "moment";
import AdminAdvertToolbar from "./admin-advert-toolbar";
import AdminAdvertsSearchBar from "./admin-adverts-search-bar";
import "./style.scss";

const DashboardAdminAdvertList = async ({ advertData, categoriesData,advertTypesData }) => {
  const { totalPages, number, size, content } = advertData.object;

  const handleProperty = (row) => {
    return <AdminAdvertPropertyCell row={row} />;
  };

  const handleStatistic = (row) => {
    return <StatisticCell row={row} />;
  };

  const handleStatus = (row) => { 
    const {status} = row;
    const statusStyle = {
      backgroundColor: status === 'PENDING' ? '#951763' :
      status === 'REJECTED' ? 'red' : 'green',
      color: "white"
    };

    return (
      <div className='w-100 d-flex align-items-center justify-content-between justify-content-lg-center '>
        <span className='d-lg-none'>Status : </span>
        <span className='badge p-2' 
        style={statusStyle}
        >{status}</span>
      </div>
    )
   }

  const handleDate = (row) => {
    const { create_at } = row;
    const dateOfPublish = moment(create_at).format("ll");

    return (
      <div className="d-flex align-items-center justify-content-between w-100">
        <span className="d-lg-none ">Date of Publish : </span>
        <span>{dateOfPublish}</span>
      </div>
    );
  };

  const handleToolbar = (row) => {
    return <AdminAdvertToolbar row={row} />;
  };

  return (
    <>
    <div className="container dashboard-advert-list">
    <AdminAdvertsSearchBar categoriesData={categoriesData} advertTypesData={advertTypesData}/>
    </div>
      <DataTable
        dataSource={content ? content : []}
        dataKey="id"
        pagination={true}
        totalPages={totalPages}
        pageNumber={number}
        pageSize={size}
      >
        <Column title="Property" template={handleProperty} />
        <Column title="Date Publish" template={handleDate} />
        <Column title="Status" template={handleStatus} />
        <Column title="View/Like/Tour" template={handleStatistic} />
        <Column title="Action" template={handleToolbar} />
      </DataTable>
    </>
  );
};

export default DashboardAdminAdvertList;
