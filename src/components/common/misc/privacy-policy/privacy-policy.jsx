"use client";
import React, { useState, useEffect } from "react";
// import { setCookie } from "cookies-next";
import "./style.scss";

const PrivacyPolicy = () => {

  const [privacy, setPrivacy] = useState("show");
  const [accepted, setAccepted] = useState(false);
  let privacyAccepted;

  useEffect(() => {
    privacyAccepted = localStorage.getItem("privacyAccepted");
    if (privacyAccepted) {
      setAccepted(true);
    }
  }, [accepted]);

  

  const handlePrivacy = () => {
    setPrivacy("hide");
    // setCookie("privacy", privacy);
    localStorage.setItem("privacyAccepted", true);
    setAccepted(true);
  };

  if (accepted) {
    return null;
  }

  return (
    <>
      <div
        className={`offcanvas offcanvas-bottom privacy-offcanvas ${privacy}`}
        tabIndex="-1"
        id="offcanvas"
        aria-labelledby="offcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasLabel">
            Cookie Usage
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => setPrivacy("")}
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>
            Our website uses cookies to enhance your browsing experience. When
            you visit our site, small text files known as cookies are placed on
            your device. These cookies help us improve the functionality of our
            site, analyze usage patterns, and provide personalized content. We
            use essential cookies for basic site functionality and may also
            utilize analytics and advertising cookies to tailor content to your
            interests. <u>You have the option to manage or reject cookies through
            your browser settings, but please note that some features may not
            function properly if cookies are disabled.</u> By continuing to use our
            site, you consent to the use of cookies as described in our Cookie
            Policy.
          </p>
        </div>
        <div className="buttons pt-3">
          <button
            id="btnReject"
            className="btn btn-secondary mb-3 mx-3"
            onClick={() => setPrivacy("")}
          >
            Reject All
          </button>
          <button
            id="btnAccept"
            className="btn btn-primary mb-3"
            onClick={() => handlePrivacy()}
          >
            Accept All
          </button>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
