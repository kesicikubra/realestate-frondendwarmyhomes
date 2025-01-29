"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { initialResponse } from "@/helpers/form-validation";
import "./style.scss";
import Link from "next/link";
import SubmitButton from "../common/buttons/submit-button";
import { registerAction } from "@/actions/register-action";
import InputMask from "react-input-mask-next";
import { PiEyeClosed, PiEye } from "react-icons/pi";

const RegisterForm = () => {
  const [state, dispatch] = useFormState(registerAction, initialResponse);
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordRetry, setShowPasswordRetry] = useState(false)

  return (
    <div className="container register-form">
      <div className="row justify-content-center ">
        <div className="col-sm-9 col-md-6 col-lg-5 col-xl-4">
          <div className="card">
            <div className="card-body">
            {!state.success && state.message ? (
								<div className="alert alert-danger">
									{state.message}
								</div>
							) : (
								""
							)}

              <form action={dispatch} noValidate>
                <div className="input-group mb-3">
                  <label htmlFor="first_name">First Name</label>

                  <input
                    type="text"
                    className={`form-control rounded-3 ${
                      state?.errors?.first_name ? "is-invalid" : ""
                    }`}
                    id="first_name"
                    name="first_name"
                  />
                  <div className="invalid-feedback">
                    {state?.errors?.first_name}
                  </div>
                </div>

                <div className="input-group mb-3">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    className={`form-control rounded-3 ${
                      state?.errors?.last_name ? "is-invalid" : ""
                    }`}
                    id="last_name"
                    name="last_name"
                  />
                  <div className="invalid-feedback">
                    {state?.errors?.last_name}
                  </div>
                </div>

                <div className="input-group mb-3">
                  <label htmlFor="phone_number">Phone</label>
                  <InputMask
                    type="phone"
                    className={`form-control rounded-3 ${
                      state?.errors?.phone_number ? "is-invalid" : ""
                    }`}
                    id="phone_number"
                    name="phone_number"
                    mask="999-999-9999"
                  />
                  <div className="invalid-feedback">
                    {state?.errors?.phone_number}
                  </div>
                </div>

                <div className="input-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className={`form-control rounded-3 ${
                      state?.errors?.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                  />
                  <div className="invalid-feedback">{state?.errors?.email}</div>
                </div>

                <div className="input-group password-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    className={`form-control rounded-3 ${
                      state?.errors?.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    name="password"
                  />
                  <div className="invalid-feedback">
                    {state?.errors?.password}
                  </div>
                  {
					          showPassword ? 
                    <PiEye size={25} onClick={()=> setShowPassword(prev => !prev)} /> : 
                    <PiEyeClosed size={25} onClick={()=> setShowPassword(prev => !prev)} />
				          }
                </div>

                <div className="input-group password-group mb-3">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type={`${showPasswordRetry ? "text" : "password"}`}
                    className={`form-control rounded-3 ${
                      state?.errors?.confirmPassword ? "is-invalid" : ""
                    }`}
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                  <div className="invalid-feedback">
                    {state?.errors?.confirmPassword}
                  </div>
                  {
					          showPasswordRetry ? 
                    <PiEye size={25} onClick={()=> setShowPasswordRetry(prev => !prev)} /> : 
                    <PiEyeClosed size={25} onClick={()=> setShowPasswordRetry(prev => !prev)} />
				          }
                </div>

                <div className="form-check">
                  <input
                    className={`form-check-input ${
                      state?.errors?.policies ? "is-invalid" : ""
                    }`}
                    type="checkbox"
                    id="policies"
                    name="policies"
                  />
                  <label className="form-check-label" htmlFor="policies">
                    I understand and agree to WarmyHomes&apos;{" "}
                    <Link href="/terms-of-use" target="_blank">
                      Terms of Use{" "}
                    </Link>
                    and <Link href="/privacy-policy" target="_blank">Privacy Policy</Link>
                  </label>
                </div>

                <div className="text-center my-5">
                  <SubmitButton title="Register" width="w-50" />
                </div>

                <h5 className="register-line mt-3">
                  If you already have an account,&nbsp;
                  <Link className="login" href="/login">
                    Login now!
                  </Link>
                </h5>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
