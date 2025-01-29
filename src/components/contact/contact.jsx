import React from "react";
import VisitOffice from "./visit-office";
import ContactForm from "./contact-form";
import Map from "./map";

const Contact = ({params,t}) => {
  return (
    <div className="contact">
      <Map />
      <ContactForm t={t}  />
      <VisitOffice  params={params.lang} />
    </div>
  );
};

export default Contact;
