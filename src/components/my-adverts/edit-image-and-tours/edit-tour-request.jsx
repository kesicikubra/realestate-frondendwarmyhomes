import React from "react";
import EditTourRequestToolbar from "./edit-tour-request-toolbar";
import DataTable, { Column } from "@/components/common/data-table/data-table";
import moment from "moment";

const EditAdvertTourRequest = ({ tourRequest }) => {
  const handleStatus = (row) => {
    const { tourReqStatus } = row;
    const statusStyle = {
      backgroundColor:
        tourReqStatus === "PENDING"
          ? "#951763"
          : tourReqStatus == "DECLINED"
          ? "red"
          : tourReqStatus == "DECLINED"
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

    let dateOfTour = moment(`${tourDate}`).format("LL");

    return (
      <div className="d-flex align-items-center justify-content-center w-100">
        <span className="d-lg-none ">Date of Tour : </span>
        <span>{dateOfTour}</span>
      </div>
    );
  };

  const handleTime = (row) => {
    const { tourTime } = row;
    const timeOfTour = tourTime.slice(0, 5);
    return (
      <div className="d-flex align-items-center justify-content-center w-100">
        <span className="d-lg-none ">Time of Tour : </span>
        <span>{timeOfTour}</span>
      </div>
    );
  };

  const handleGuestName = (row) => {
    const { guestUserName } = row;
    
    return (
      <div className="d-flex align-items-center justify-content-center w-100">
        <span className="d-lg-none ">GuestName: </span>
        <span>{guestUserName}</span>
      </div>
    );
  };

  const handleToolbar = (row) => {
    return <EditTourRequestToolbar row={row} />;
  };
  return (
    <div className="container user-tour-request-table">
      <DataTable dataSource={tourRequest ? tourRequest : []} dataKey="id">
        <Column title="Guest" template={handleGuestName} />
        <Column title="Status" template={handleStatus} />
        <Column title="Tour Request Date" template={handleDate} />
        <Column title="Tour Request Time" template={handleTime} />
        <Column title="Action" template={handleToolbar} />
      </DataTable>
    </div>
  );
};

export default EditAdvertTourRequest;
