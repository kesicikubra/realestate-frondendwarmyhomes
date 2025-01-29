"use client";
import Image from "next/image";
import "./style.scss";
import React from "react";
import { useFormState } from "react-dom";
import { initialResponse, isInvalid } from "@/helpers/form-validation";
import {
  approveTourRequestAction,
  cancelTourRequestAction,
  declineTourRequestAction,
  updateTourRequestAction,
} from "@/actions/tour-requests-action";
import SubmitButton from "@/components/common/buttons/submit-button";
import { useRouter } from "next/navigation";
import { swalAlert, swalConfirm } from "@/helpers/swal";

const UpdateTourRequestForm = ({ data, ownerName }) => {
  const [state, dispatch] = useFormState(
    updateTourRequestAction,
    initialResponse
  );

  const {
    id,
    tourReqStatus,
    tourDate,
    tourTime,
    ownerUserName,
    guestUserName,
    advertTitle,
    advertPrice,
    countryName,
    cityName,
    districtName,
    imageData,
  } = data;
  const router = useRouter();

  const handleCancel = async () => {
    const res = await swalConfirm("Are you sure to cancel");
    if (!res.isConfirmed) return;

    try {
      const res = await cancelTourRequestAction(id);
    } catch (err) {
      console.log(err);
      swalAlert(err.message, "error");
    }
  };

  const handleReject = async () => {
    const res = await swalConfirm("Are you sure to reject");
    if (!res.isConfirmed) return;

    try {
      const res = await declineTourRequestAction(id);
    } catch (err) {
      console.log(err);
      swalAlert(err.message, "error");
    }
  };
  const handleApprove = async () => {
    const res = await swalConfirm("Are you sure to approve");
    if (!res.isConfirmed) return;

    try {
      const res = await approveTourRequestAction(id);
    } catch (err) {
      console.log(err);
      swalAlert(err.message, "error");
    }
  };

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
      <div className="row">
        <div className="col-12 img-col col-lg-6">
          <Image
            src={`data:image/jpeg;base64,${imageData}`}
            width={725}
            height={473}
            alt={advertTitle}
            className="img-fluid"
          />
          <span className="status badge p-2" style={statusStyle}>
            {tourReqStatus}
          </span>
        </div>

        <div className="col-12 col-lg-6">
          <h4 className="title mb-0">{advertTitle}</h4>
          <div className="price-tag">
            <span>${advertPrice}</span>
          </div>
          <p className="m-0 mb-2">
            {districtName}, {cityName}, {countryName}
          </p>
          {!state?.success && state.message ? (
            <div className="alert alert-danger">{state.message}</div>
          ) : (
            ""
          )}
          <form noValidate action={dispatch}>
            <input type="hidden" name="advertId" value={id} />
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="input-group">
                  <label htmlFor="tour_date">Tour Date</label>
                  <input
                    type="date"
                    name="tour_date"
                    id="tour_date"
                    placeholder="Tour time"
                    className={`form-control rounded-2 ${isInvalid(
                      state.errors?.tour_date
                    )}`}
                    defaultValue={tourDate}
                    disabled={tourReqStatus === "CANCELED"}
                  />
                  <div className="invalid-feedback">
                    {state.errors?.tour_date}
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="input-group">
                  <label htmlFor="tour_time">Tour Time</label>
                  <input
                    id="tour_time"
                    type="time"
                    name="tour_time"
                    min="12:00"
                    max="18:00"
                    className={`form-control rounded-2 ${isInvalid(
                      state.errors?.tour_time
                    )}`}
                    defaultValue={tourTime}
                    disabled={
                      tourReqStatus === "CANCELED" ||
                      tourReqStatus === "APPROVED" ||
                      tourReqStatus === "DECLINED"
                    }
                  />
                  <div className="invalid-feedback">
                    {state.errors?.tour_time}
                  </div>
                </div>
              </div>
            </div>
            <div className="container buttons">
              <button
                className="btn btn-secondary"
                onClick={() => router.back()}
              >
                Return
              </button>
              {ownerName === ownerUserName ? (
                <>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleReject}
                    style={{
                      display:
                        tourReqStatus === "CANCELED"
                          ? "none"
                          : tourReqStatus === "APPROVED"
                          ? "none"
                          : tourReqStatus === "DECLINED"
                          ? "none"
                          : "",
                    }}
                  >
                    Reject Request
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleApprove}
                    style={{
                      display:
                        tourReqStatus === "CANCELED"
                          ? "none"
                          : tourReqStatus === "APPROVED"
                          ? "none"
                          : tourReqStatus === "DECLINED"
                          ? "none"
                          : "",
                    }}
                  >
                    Approve Request
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                    style={{
                      display:
                        tourReqStatus === "CANCELED"
                          ? "none"
                          : tourReqStatus === "APPROVED"
                          ? "none"
                          : tourReqStatus === "DECLINED"
                          ? "none"
                          : "",
                    }}
                  >
                    Cancel Request
                  </button>
                  <SubmitButton
                    title="Update"
                    display={
                      tourReqStatus === "CANCELED"
                        ? "none"
                        : tourReqStatus === "APPROVED"
                        ? "none"
                        : tourReqStatus === "DECLINED"
                        ? "none"
                        : ""
                    }
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTourRequestForm;
