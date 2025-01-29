"use client";
import { useFormState } from "react-dom";
import "./forgot-password.scss";
import { initialResponse } from "@/helpers/form-validation";
import { forgotPasswordAction } from "@/actions/auth-actions";
import SubmitButton from "../common/buttons/submit-button";

const ForgotPassword = () => {
  const [state, dispatch] = useFormState(forgotPasswordAction, initialResponse);

  return (
    <div className="container forgot-password">
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
                <div
                  
                >
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                   className={`form-control mt-2 ${
                      state?.errors?.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                  />

                  <div className="invalid-feedback">{state?.errors?.email}</div>
                </div>
                <div className="text-center mt-5">
                  <SubmitButton title="Send Reset Code" width="w-50" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
