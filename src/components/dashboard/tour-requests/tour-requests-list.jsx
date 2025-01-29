"use client";
import React from "react";
import DataTable, { Column } from "@/components/common/data-table/data-table";
import moment from "moment";
import DashboardTourRequestPropertyCell from "./tour-request-property-cell";
import DashboarTourRequestsToolbar from "./tour-requests-toolbar";
import DashboardTourRequestsSearchBar from "./tour-request-searchbar";

const DashboardTourRequestsList = ({ data }) => {
  const { totalPages, size, number, content } = data;
  const handleProperty = (row) => {
    return <DashboardTourRequestPropertyCell row={row} />;
  };

  const handleOwner = (row) => {
    const { ownerUserName } = row;

    return (
      <div className="w-100 d-flex align-items-center justify-content-between">
        <span className="d-lg-none">Owner : </span>
        <span> {ownerUserName}</span>
      </div>
    );
  };

  const handleGuest = (row) => {
    const { guestUserName } = row;

    return (
      <div className="w-100 d-flex align-items-center justify-content-between">
        <span className="d-lg-none">Guest : </span>
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

  const handleDate = (row) => {
    const { tourDate } = row;
    const fixedTourDate = moment(tourDate).format("ll");
    return (
      <div className="d-flex align-items-center justify-content-between w-100">
        <span className="d-lg-none ">Tour Date : </span>
        <span>{fixedTourDate}</span>
      </div>
    );
  };

  const handleTime = (row) => {
    const { tourTime } = row;
    const fixedTourTime = tourTime.slice(0, 5);
    return (
      <div className="d-flex align-items-center justify-content-between justify-content-lg-center w-100">
        <span className="d-lg-none ">Tour Time : </span>
        <span>{fixedTourTime}</span>
      </div>
    );
  };

  const handleToolbar = (row) => {
    return <DashboarTourRequestsToolbar row={row} />;
  };

  return (
    <>
      <div className="container d-flex direction-column align-items-center justify-content-center">
        <DashboardTourRequestsSearchBar />
      </div>
      <div className="container">
        <DataTable
          dataSource={content ? content : []}
          dataKey="id"
          pagination={true}
          totalPages={totalPages}
          pageNumber={number}
          pageSize={size}
        >
          <Column title="Property" template={handleProperty} />
          <Column title="Owner" template={handleOwner} />
          <Column title="Guest" template={handleGuest} />
          <Column title="Status" template={handleStatus} />
          <Column title="Tour Date" template={handleDate} />
          <Column title="Tour Time" template={handleTime} />
          <Column title="Action" template={handleToolbar} />
        </DataTable>
      </div>
    </>
  );
};

export default DashboardTourRequestsList;
