import React from "react";
import moment from "moment";
import "./style.scss";
import UserOwnerTourTequestPagePropertyCell from "./property-cell";
import DataTable, { Column } from "@/components/common/data-table/data-table";
import UserOwnerTourRequestPageToolbar from "./owner-tour-request-toolbar";

const UserOwnerTourRerquestsList = ({ ownerData }) => {
  const { totalPages, size, number } = ownerData;

  const handleProperty = (row) => {
    return <UserOwnerTourTequestPagePropertyCell row={row} />;
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
      <div className="w-100 d-flex align-items-center justify-content-center">
        <span className="d-lg-none">Status : </span>
        <span className="badge p-2" style={statusStyle}>
          {tourReqStatus}
        </span>
      </div>
    );
  };

  const handleDate = (row) => {
    const { tourDate } = row;

    let dateOfTour = moment(`${tourDate}`).format("L");

    return (
      <div className="d-flex align-items-center justify-content-center w-100">
        <span className="d-lg-none ">Date of Publish : </span>
        <span>{dateOfTour}</span>
      </div>
    );
  };

  const handleTime = (row) => {
    const { tourTime } = row;
    const timeOfTour = tourTime.slice(0, 5);
    return timeOfTour;
  };

  const handleToolbar = (row) => {
    return <UserOwnerTourRequestPageToolbar row={row} />;
  };

  return (
    <div className="container user-tour-request-table">
      <DataTable
        dataSource={ownerData?.content ? ownerData?.content : []}
        dataKey="id"
        pagination={true}
        totalPages={totalPages}
        pageNumber={number}
        pageSize={size}
      >
        <Column title="Property" template={handleProperty} />
        <Column title="Guest" fields="guestUserName" />
        <Column title="Status" template={handleStatus} />
        <Column title="Tour Request Date" template={handleDate} />
        <Column title="Tour Request Time" template={handleTime} />
        <Column title="Action" template={handleToolbar} />
      </DataTable>
    </div>
  );
};

export default UserOwnerTourRerquestsList;
