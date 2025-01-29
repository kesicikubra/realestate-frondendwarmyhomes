"use client";
import React from "react";
import { useFormState } from "react-dom";
import "./style.scss";
import { initialResponse } from "@/helpers/form-validation";
import { getAdvertHaveTheMostTourRequestAction } from "@/actions/reports-action";
import Image from "next/image";
import { ImFolderDownload } from "react-icons/im";

const MostPopularReportForm = () => {
  const [state, dispatch] = useFormState(
    getAdvertHaveTheMostTourRequestAction,
    initialResponse
  );

  let byteData = state?.data?.object;
  return (
    <form className="properties-report w-100" action={dispatch} noValidate>
      <div className="card w-100">
        <div className="card-body">
          <h2>Most Popular Properties</h2>
          <div class="input-group mb-3 d-flex flex-column">
            <label className="form-label" htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              class="form-control w-100 rounded-2"
              placeholder="Amount..."
              aria-label="amount"
              aria-describedby="basic-addon1"
            />
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
          <Image src="/images/dashboard/reports.svg" width={60} height={60}  alt="reports icon"/>
        </button>
      )}
    </form>
  );
};

export default MostPopularReportForm;
