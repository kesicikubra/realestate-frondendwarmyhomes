"use client";
import React from "react";
import DataTable, { Column } from "@/components/common/data-table/data-table";
import UsersListToolbar from "./users-list-toolbar";
import UsersListSearchBar from "./users-list-searchbar";

const UsersList = ({ data }) => {
  const { content, totalPages, size, number } = data;

  const handleName = (row) => {
    
    return (
      <div className="d-flex align-items-center justify-content-around justify-content-md-start">
        <span className="d-lg-none me-3 ">Name:</span>
        <span>
          {row.first_name} {row.last_name}
        </span>
      </div>
    );
  };

  const handleEmail = (row) => {
    return (
      <div className="d-flex align-items-center justify-content-between justify-content-md-start">
        <span className="d-lg-none me-3">Email:</span>
        <span>{row.email}</span>
      </div>
    );
  };

  const handleToolbar = (row) => {
    return <UsersListToolbar row={row} />;
  };

  const handlePhone = (row) => {
    
    return (
      <div className="d-flex align-items-center justify-content-start">
        <span className="d-lg-none me-3">Phone:</span>
        <span>{row.phone_number}</span>
      </div>
    );
  };

  return (
    <>
      <div className="container d-flex  align-items-center justify-content-center">
        <UsersListSearchBar />
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
          <Column title="Name" template={handleName} />
          <Column title="Email" template={handleEmail} />
          <Column title="Phone" template={handlePhone} />
          <Column title="Action" template={handleToolbar} />
        </DataTable>
      </div>
    </>
  );
};

export default UsersList;
