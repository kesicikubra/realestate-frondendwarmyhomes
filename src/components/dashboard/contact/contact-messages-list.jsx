"use client";
import React from "react";
import ContactMessagesToolbar from "./contact-messages-toolbar";
import DataTable, { Column } from "@/components/common/data-table/data-table";
import "./style.scss";
import ContactMessagesSearchBar from "./contact-message-searchbar";

const ContactMessagesList = ({ data }) => {
  const { content, totalPages, size, number } = data.object;

  const handleName = (row) => {
    return (
      <div>
        <span className="d-lg-none me-3">Name:</span>
        <span>
          {row.firstName} {row.lastName}
        </span>
      </div>
    );
  };

  const handleEmail = (row) => {
    return (
      <div className="d-flex align-items-center justify-content-start">
        <span className="d-lg-none me-3">Email:</span>
        <span>{row.email}</span>
      </div>
    );
  };

  const handleToolbar = (row) => {
    return <ContactMessagesToolbar row={row} />;
  };

  const handleStatus = (row) => {

    const bg = row.status === "READ" ? true : false;
    return (
      <div className="d-flex justify-content-flex-start align-items-center">
        <span className={`badge text-bg-${bg ? "secondary" : "primary"}`}>
          {row?.status?.toLowerCase()}
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="container">
        <ContactMessagesSearchBar />
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
          <Column title="Status" template={handleStatus} />
          <Column title="Action" template={handleToolbar} />
        </DataTable>
      </div>
    </>
  );
};

export default ContactMessagesList;
