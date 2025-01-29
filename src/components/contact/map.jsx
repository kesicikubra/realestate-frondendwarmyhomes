import { config } from "@/helpers/config";
import React from "react";

const Map = () => {
  return (
    <iframe
      src={config.contact.mapEmbedURL}
      width="100%"
      height="579"
      style={{ border: "0",borderRadius:"20px" }}
      allowFullScreen=""
      loading="eager"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default Map;
