"use client";
import React from "react";
import { useFormState } from "react-dom";
import "./style.scss";
import { initialResponse } from "@/helpers/form-validation";
import { getUsersByRolesAction } from "@/actions/reports-action";
import Image from "next/image";
import { ImFolderDownload } from "react-icons/im";

const UserReportForm = () => {
  const [state, dispatch] = useFormState(
    getUsersByRolesAction,
    initialResponse
  );

  let byteData = state?.data?.object;

  return (
    <form className="user-report w-100" action={dispatch} noValidate>
      <div className="card w-100">
        <div className="card-body">
          <h2>Users</h2>
          <div className="input-group mb-3 d-flex flex-column">
            <label className="form-label" htmlFor="role">
              User Roles
            </label>
            <select
              className={`form-select w-100 rounded-2`}
              aria-label="Default select example"
              name="role"
              id="role"
            >
              <option selected disabled>
                Choose...
              </option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
        </div>
      </div>
      {byteData && byteData.length > 0 ? (
        <a
          href={`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${byteData}`}
          download="report.xlsx"
          className="download-link"
        >
          <p>
            Download <ImFolderDownload />
          </p>
        </a>
      ) : (
        <button type="submit">
          <Image src="/images/dashboard/reports.svg" width={60} height={60} alt="report icon"/>
        </button>
      )}
    </form>
  );
};

export default UserReportForm;
