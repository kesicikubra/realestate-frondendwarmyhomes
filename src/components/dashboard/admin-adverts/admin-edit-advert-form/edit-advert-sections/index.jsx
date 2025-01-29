import React from "react";
import "./style.scss";
import DashboardEditAdvertFormTourRequestsList from "../edit-advert-tour-requests";
import DashboardEditAdvertImages from "../edit-advert-images";
import Spacer from "@/components/common/misc/spacer";
import DashboardEditImageToFeaturedOrDelete from "../edit-advert-images/adminEditFeaturedOrDelete";

const DashboardEditAdvertPageSectionTabs = ({ tourRequests }) => {
  return (
    <div className="container edit-advert-sections-container">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            href="#images"
            data-bs-toggle="tab"
          >
            Images
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            href="#tourRequests"
            data-bs-toggle="tab"
          >
            Tour Requests
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="images" role="tabpanel">
          <Spacer />
          <DashboardEditAdvertImages advertData={tourRequests} />
          <Spacer />
          <DashboardEditImageToFeaturedOrDelete advertData={tourRequests} />
        </div>
        <div className="tab-pane fade" id="tourRequests" role="tabpanel">
          <DashboardEditAdvertFormTourRequestsList
            tourRequests={tourRequests}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardEditAdvertPageSectionTabs;
