"use client";
import React from "react";
import { useFormState } from "react-dom";
import { initialResponse } from "@/helpers/form-validation";
import "./style.scss";
import InputMask from "react-input-mask-next";
import { myProfileUpdateAction } from "@/actions/my-profile-action";
import MyProfileDeleteButton from "./delete-button";
import SubmitButton from "../common/buttons/submit-button";

const UpdateForm = ({data}) => {
  const [state, dispatch] = useFormState(myProfileUpdateAction, initialResponse);
  

  const {id ,first_name,last_name,email,phone_number} = data

  return (
    <div className="container update-form">
      <div className="row justify-content-center ">
        <div className="col-sm-9 col-md-6 col-lg-12 col-xl-9">
          <div className="card">
            <div className="card-body">
              {!state?.success && state?.message ? (
                <div className="alert alert-danger">{state?.message}</div>
              ) : (
                ""
              )}

              <form action={dispatch} noValidate>
                <div className="input-group mb-3">
                  <label htmlFor="first_name">First Name</label>

                  <input
                    type="text"
                    className={`form-control rounded-2 ${
                      state?.errors?.first_name ? "is-invalid" : ""
                    }`}
                    id="first_name"
                    name="first_name"
                    defaultValue={first_name}
                  />
                  <div className="invalid-feedback">
                    {state?.errors?.first_name}
                  </div>
                </div>

                <div className="input-group mb-3">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    className={`form-control rounded-2 ${
                      state?.errors?.last_name ? "is-invalid" : ""
                    }`}
                    id="last_name"
                    name="last_name"
                    defaultValue={last_name}
                  />
                  <div className="invalid-feedback">
                    {state?.errors?.last_name}
                  </div>
                </div>

                <div className="input-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className={`form-control rounded-2 ${
                      state?.errors?.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                    defaultValue={email}
                  />
                  <div className="invalid-feedback">{state?.errors?.email}</div>
                </div>

                <div className="input-group mb-3">
                  <label htmlFor="phone_number">Phone</label>
                  <InputMask
                    type="phone"
                    className={`form-control rounded-2 ${
                      state?.errors?.phone_number ? "is-invalid" : ""
                    }`}
                    id="phone_number"
                    name="phone_number"
                    mask="999-999-9999"
                    defaultValue={phone_number}
                  />
                  <div className="invalid-feedback">
                    {state?.errors?.phone_number}
                  </div>
                </div>

                <div className="text-center my-5">
                  <SubmitButton title="Update" width="w-100" />
                </div>

                
              </form>

              <div  className="text-center">
              <MyProfileDeleteButton/>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;