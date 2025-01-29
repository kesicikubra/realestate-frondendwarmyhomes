"use client";
import { useFormState, useFormStatus } from "react-dom";
import "./contact-form.scss";
import ReCAPTCHA from "react-google-recaptcha";
import { initialResponse } from "@/helpers/form-validation";
import { useRef, useState } from "react";
import { swalAlert } from "@/helpers/swal";
import { createMessageAction } from "@/actions/contact-messages-action";
import SubmitButton from "../common/buttons/submit-button";
import { useDictionary } from "@/helpers/providers/lang-switcher-provider";

const ContactForm = ({t})=> {


  const [state, dispatch] = useFormState(createMessageAction, initialResponse);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const formRef = useRef(null);
  const { pending } = useFormStatus();

  if (state?.message === "Message Created Successfully") {
    if (state.success) {
      formRef.current.reset();
      swalAlert(state?.message, "success");
    } else {
      swalAlert(state?.message, "error");
    }
  }

  const handleCaptchaChange = () => {
    setIsCaptchaVerified(true)
    
  };

  return (
    <div className="contact-container">
      <div className="row">
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center ">
          {/* {!state?.success && state?.message ? (
            <div className="alert alert-danger">{state?.message}</div>
          ) : (
            ""
          )} */}
          <form
            className="contact-form"
            action={dispatch}
            noValidate
            ref={formRef}
          >
            <h2>{t.contact.getTouch}</h2>
            <div className="input-group mb-3">
              <div>
                <label htmlFor="firstName">{t.contact.firstName}</label>
                <input
                  type="text"
                  className={`form-control ${
                    state?.errors?.firstName ? "is-invalid" : ""
                  }`}
                  id="firstName"
                  name="firstName"
                />
                <div className="invalid-feedback">
                  {state?.errors?.firstName}
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <div>
                <label htmlFor="lastName">{t.contact.lastName}</label>
                <input
                  type="text"
                  className={`form-control ${
                    state?.errors?.lastName ? "is-invalid" : ""
                  }`}
                  id="lastName"
                  name="lastName"
                />
                <div className="invalid-feedback">
                  {state?.errors?.lastName}
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <div>
                <label htmlFor="email">{t.contact.email}</label>
                <input
                  type="email"
                  className={`form-control ${
                    state?.errors?.email ? "is-invalid" : ""
                  }`}
                  id="email"
                  name="email"
                />
                <div className="invalid-feedback">{state?.errors?.email}</div>
              </div>
            </div>
            <div className="input-group mb-4">
              <div>
                <label htmlFor="message">{t.contact.message}</label>
                <textarea
                  className={`form-control ${
                    state?.errors?.message ? "is-invalid" : ""
                  }`}
                  placeholder={t.contact.placeHolder}
                  id="message"
                  name="message"
                ></textarea>
                <div className="invalid-feedback">{state?.errors?.message}</div>
              </div>
            </div>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              className="mb-3"
              data-size="compact"
              style={{ transform: "scale(0.77)", transformOrigin: "50% 50%" }}
              onChange={handleCaptchaChange}
            />
            {
              isCaptchaVerified ? <SubmitButton title="Send"/> : <button className="btn btn-primary" disabled>{t.contact.send}</button>
            }
          </form>
        </div>
        <div className="col-12 col-lg-6 hear mt-5">
          <h2>{t.contact.happyToHear}</h2>
          <h2>{t.contact.fromYou}</h2>
          <p>
          {t.contact.text9000}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
