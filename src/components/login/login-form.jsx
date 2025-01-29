"use client";
import { useFormState } from "react-dom";
import "./login-form.scss";
import { initialResponse } from "@/helpers/form-validation";
import { loginAction } from "@/actions/auth-actions";
import SubmitButton from "../common/buttons/submit-button";
import Link from "next/link";
import { PiEyeClosed, PiEye } from "react-icons/pi";
import { useState } from "react";
import { useDictionary } from "@/helpers/providers/lang-switcher-provider";

const LoginForm = async() => {

  const [state, dispatch] = useFormState(loginAction, initialResponse);
  const [showPassword, setShowPassword] = useState(false)
  const t=await useDictionary();
  console.log("state",state);
  return (
    <div className="container login-form">
      <div className="row justify-content-center ">
        <div className="col-sm-9 col-md-6 col-lg-5 col-xl-4">
          <div className="card">
            <div className="card-body">
              {!state?.success && state.message == "User is not enable" ? (
                <div className="alert alert-danger">Plesase confirm your email addresss.</div>
              ) : 
                state === "User is not enable" ?
                (
                  <div className="alert alert-danger">{t.login.confirmYour}</div>
                ) 
                ? !state?.success && state.message
                : <div className="alert alert-danger">{state.message}</div>
                :
              (
                ""
              )}
              <form action={dispatch} noValidate>
                <div className="input-group mb-3">
                  <label htmlFor="email">{t.login.eMail}</label>
                  <input
                    type="email"
                    className={`form-control rounded-3 ${
                      state?.errors?.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                  />

                  <div className="invalid-feedback">{state?.errors?.email}</div>
                </div>

                <div className="input-group password-group mb-3">
                  <label htmlFor="password">{t.login.password}</label>
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
					showPassword ? <PiEye size={25} onClick={()=> setShowPassword(prev => !prev)} /> : <PiEyeClosed size={25} onClick={()=> setShowPassword(prev => !prev)} />
				  }
                </div>
                <Link href="/forgot-password">{t.login.forgotPassword}</Link>
                <div className="text-center mt-4">
                  <SubmitButton title="Login" width="w-50" />
                </div>
                <div className="register-text">
                  {t.login.ifYou}&nbsp;
                  <Link href="/register">{t.login.registerNow}</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
