"use client";
import Image from "next/image";
import React from "react";
import { useFormState } from "react-dom";
import { initialResponse, isInvalid } from "@/helpers/form-validation";
import DeleteButton from "@/components/common/buttons/delete-button";
import { deleteTourRequestAction } from "@/actions/tour-requests-action";
import "./style.scss";
import AdminTourRequestDeleteButton from "./admin-tour-request-delete-btn";
import { useRouter } from "next/navigation";
import moment from "moment";

const AdminTourRequestDetail = ({ data }) => {
  const {
    id,
    tourDate,
    tourTime,
    advertTitle,
    countryName,
    cityName,
    districtName,
    imageData,
    advertPrice,
    tourReqStatus
  } = data;
  const fixedTourTime = tourTime.slice(0, 5);

  const newDate = new Date();
  const dateOfDay = moment(newDate).format("YYYY-MM-DD");

  const router = useRouter();

  const [state, dispatch] = useFormState(
    deleteTourRequestAction,
    initialResponse
  );

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
    <div className="container">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="col img-col col-lg-6">
          <Image
            src={`data:image/jpeg;base64,${imageData}`}
            alt={advertTitle}
            width={580}
            height={388}
            className="img-fluid"
          />
          <span className="status badge p-2" style={statusStyle}>
            {tourReqStatus}
          </span>
        </div>

        <div className="col col-lg-6 tour-container">
          <div className="tour-info">
            <div>
              <h4 className="title mb-0">{advertTitle}</h4>
              <p className="m-0 mb-2">
                {districtName},{cityName},{countryName}
              </p>
            </div>
            <span className="price-tag"> ${advertPrice}</span>
          </div>

          <form noValidate action={dispatch}>
            <input type="hidden" name="advertId" value="1" />
            <div className="row form-container">
              <div className="col-6">
                <div className="input-group">
                  <label htmlFor="date">Tour Date</label>
                  <input
                    disabled
                    defaultValue={tourDate}
                    type="date"
                    name="tour_date"
                    id="tour_date"
                    placeholder="Tour time"
                    className={`form-control rounded-2  ${isInvalid(
                      state.errors?.tour_date
                    )}`}
                  />
                </div>
              </div>

              <div className="col-6 ">
                <div className="input-group">
                  <label htmlFor="time">Tour Time</label>
                  <input
                    disabled
                    defaultValue={fixedTourTime}
                    id="tour_time"
                    type="time"
                    name="tour_time"
                    min="12:00"
                    max="18:00"
                    placeholder="Tour Date"
                    className={`form-control rounded-2 ${isInvalid(
                      state.errors?.tour_time
                    )}`}
                  />
                </div>
              </div>
            </div>
            <div className="buttons">
              <button
                className="btn btn-secondary"
                onClick={() => router.back()}
              >
                Return
              </button>
              {
                dateOfDay > tourDate ? (
                  <AdminTourRequestDeleteButton id={id} />
                ) : null
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminTourRequestDetail;
