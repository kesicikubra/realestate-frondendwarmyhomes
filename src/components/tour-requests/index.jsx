import React from 'react'
import UserOwnerTourRerquestsList from './received-tour-requests'
import UserGuestTourRerquestsList from './guest-tour-requests'
import "./style.scss"

const UserTourRequestsSections = ({ ownerData, guestData }) => {
  return (
    <div className="container">
        <div className="container tour-request-container">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                href="#receivedRequests"
                data-bs-toggle="tab"
              >
                Received Tour Requests
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                href="#sentRequests"
                data-bs-toggle="tab"
              >
                Sent Tour Requests
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane fade show active" id="receivedRequests" role="tabpanel">
              <UserOwnerTourRerquestsList ownerData={ownerData?.object} />
            </div>
            <div className="tab-pane fade" id="sentRequests" role="tabpanel">
              <UserGuestTourRerquestsList guestData={guestData?.object}/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default UserTourRequestsSections
