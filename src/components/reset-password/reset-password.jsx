"use client";
import React from "react";
import "./reset-password.scss";
import { useFormState } from "react-dom";
import { initialResponse } from "@/helpers/form-validation";
import { resetPasswordAction } from "@/actions/change-password-action";
import SubmitButton from "../common/buttons/submit-button";
import { PiEyeClosed, PiEye } from "react-icons/pi";
import { useState } from "react";

const ResetPassword = () => {
  const [state, dispatch] = useFormState(
    resetPasswordAction,
    initialResponse
  );
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="container reset-password">
      <div className="row justify-content-center ">
        <div className="col-sm-9 col-md-6 col-lg-5 col-xl-4">
          <div className="card">
            <div className="card-body">
              {!state?.success && state?.message ? (
                <div className="alert alert-danger">{state.message}</div>
              ) : (
                ""
              )}

              <form action={dispatch} noValidate>

                <div className="input-group mb-3">
                  <label htmlFor="code">Reset Code</label>
                  <input
                    type="text"
                    className={`form-control rounded-2 ${
                      state?.errors?.code ? "is-invalid" : ""
                    }`}
                    id="code"
                    name="code"
                  />
                  <div className="invalid-feedback">
                    {state?.errors?.code}
                  </div>
                </div>
                <div className="input-group password-group mb-3">
                  <label htmlFor="password">New Password</label>
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    className={`form-control rounded-2 ${
                      state?.errors?.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    name="password"
                  />
                  <div className="invalid-feedback">
                    {state?.errors?.password}
                  </div>
                  {
                    showPassword ? <PiEye size={25} onClick={()=> setShowPassword(prev => !prev)} /> : <PiEyeClosed size={25} onClick={()=> setShowPassword(prev => !prev)} />
                  }
                </div>

                <div className="input-group password-group mb-3">
                  <label htmlFor="confirmPassword">Retry New Password</label>
                  <input
                    type={`${showConfirmPassword ? "text" : "password"}`}
                    className={`form-control rounded-2 ${
                      state?.errors?.confirmPassword ? "is-invalid" : ""
                    }`}
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                  <div className="invalid-feedback">
                    {state?.errors?.confirmPassword}
                  </div>
                  {
                    showConfirmPassword ? <PiEye size={25} onClick={()=> setShowConfirmPassword(prev => !prev)} /> : <PiEyeClosed size={25} onClick={()=> setShowConfirmPassword(prev => !prev)} />
                  }
                </div>

                <div className="text-center mt-4">
                  <SubmitButton title="Reset" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
