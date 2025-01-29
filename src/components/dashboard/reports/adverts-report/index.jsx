"use client";
import React from "react";
import "./style.scss";
import Image from "next/image";
import { useFormState } from "react-dom";
import { getAdvertsByTheDateRangeAction } from "@/actions/reports-action";
import { initialResponse } from "@/helpers/form-validation";
import { ImFolderDownload } from "react-icons/im";

const AdvertsReportForm = ({ categories, advertTypes }) => {
  const [state, dispatch] = useFormState(
    getAdvertsByTheDateRangeAction,
    initialResponse
  );

  let byteData = state?.data?.object;

  return (
    <form className="advert-report w-100" action={dispatch} noValidate>
      <div className="card w-100">
        <div className="card-body">
          <h2>Adverts</h2>
          <div className="row">
            <div className="col-12 col-md-6 col-xl-3">
              <div class="input-group mb-3 d-flex flex-column">
                <label className="form-label" htmlFor="beginDate">
                  Begin Date
                </label>
                <input
                  type="date"
                  name="beginDate"
                  class="form-control w-100 rounded-2"
                  placeholder="Begining Date"
                  aria-label="beginDate"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-3">
              <div class="input-group mb-3 d-flex flex-column">
                <label className="form-label" htmlFor="endDate">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  class="form-control w-100 rounded-2"
                  placeholder="End Date"
                  aria-label="endDate"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="col-12 col-md-4 col-xl-2">
              <div class="input-group mb-3 d-flex flex-column">
                <label className="form-label" htmlFor="typeTitle">
                  Types
                </label>
                <select
                  className={`form-select w-100 rounded-2`}
                  aria-label="Default select example"
                  name="typeTitle"
                >
                  <option selected disabled>
                    Choose...
                  </option>
                  {advertTypes?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-12 col-md-4 col-xl-2">
              <div className="input-group mb-3 d-flex flex-column">
                <label className="form-label" htmlFor="categoryTitle">
                  Category
                </label>
                <select
                  className={`form-select w-100 rounded-2`}
                  aria-label="Default select example"
                  name="categoryTitle"
                  id="categoryTitle"
                >
                  <option selected disabled>
                    Choose...
                  </option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-12 col-md-4 col-xl-2">
              <div className="input-group mb-3 d-flex flex-column">
                <label className="form-label" htmlFor="status">
                  Status
                </label>
                <select
                  className={`form-select w-100 rounded-2`}
                  aria-label="Default select example"
                  name="status"
                  id="status"
                >
                  <option selected disabled>
                    Choose...
                  </option>
                  <option value="0">Pending</option>
                  <option value="1">Activated</option>
                  <option value="2">Declined</option>
                </select>
              </div>
            </div>
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
          <Image src="/images/dashboard/reports.svg" width={60} height={60} alt="reports icon"/>
        </button>
      )}
    </form>
  );
};

export default AdvertsReportForm;
