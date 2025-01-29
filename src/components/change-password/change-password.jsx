"use client";
import React from "react";
import "./change-password.scss";
import { useFormState } from "react-dom";
import { initialResponse } from "@/helpers/form-validation";
import { patchChangePasswordAction } from "@/actions/change-password-action";
import SubmitButton from "../common/buttons/submit-button";
import { PiEyeClosed, PiEye } from "react-icons/pi";
import { useState } from "react";

const ChangePassword = () => {
  const [state, dispatch] = useFormState( patchChangePasswordAction, initialResponse);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordSecond, setShowPasswordSecond] = useState(false)
  const [showPasswordThird, setShowPasswordThird] = useState(false)

  return (
    <div className="container change-password">
      <div className="row justify-content-center ">
        <div className="col-sm-9 col-md-6 col-lg-5 col-xl-4">
          <div className="card">
            <div className="card-body">
              {!state.success && state.message ? (
                <div className="alert alert-danger">{state.message}</div>
              ) : (
                ""
              )}

              <form action={dispatch} noValidate>
                <div className="input-group password-group mb-3">
                  <label htmlFor="old_password">Current Password</label>
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    className={`form-control rounded-2 ${
                      state?.errors?.old_password ? "is-invalid" : ""
                    }`}
                    id="old_password"
                    name="old_password"
                    defaultValue=""
                  />
                  <div className="invalid-feedback">
                    {state?.errors?.old_password}
                  </div>
                  {showPassword ? (
                    <PiEye
                      size={25}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  ) : (
                    <PiEyeClosed
                      size={25}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  )}
                </div>

                <div className="input-group password-group mb-3">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type={`${showPasswordSecond ? "text" : "password"}`}
                    className={`form-control rounded-2 ${
                      state?.errors?.new_password ? "is-invalid" : ""
                    }`}
                    id="newPassword"
                    name="new_password"
                    defaultValue=""
                  />
                  <div className="invalid-feedback">
                    {state?.errors?.new_password}
                  </div>
                  {showPasswordSecond ? (
                    <PiEye
                      size={25}
                      onClick={() => setShowPasswordSecond((prev) => !prev)}
                    />
                  ) : (
                    <PiEyeClosed
                      size={25}
                      onClick={() => setShowPasswordSecond((prev) => !prev)}
                    />
                  )}
                </div>

                <div className="input-group password-group mb-3">
                  <label htmlFor="confirmPassword">Retry New Password</label>
                  <input
                    type="password"
                    className={`form-control rounded-2 ${
                      state?.errors?.confirm_password ? "is-invalid" : ""
                    }`}
                    id="confirmPassword"
                    name="confirm_password"
                    defaultValue=""
                  />
                  <div className="invalid-feedback">
                    {state?.errors?.confirm_password}
                  </div>
                  {showPasswordThird ? (
                    <PiEye
                      size={25}
                      onClick={() => setShowPasswordThird((prev) => !prev)}
                    />
                  ) : (
                    <PiEyeClosed
                      size={25}
                      onClick={() => setShowPasswordThird((prev) => !prev)}
                    />
                  )}
                </div>

                <div className="text-center mt-4">
                  <SubmitButton title="Change" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
