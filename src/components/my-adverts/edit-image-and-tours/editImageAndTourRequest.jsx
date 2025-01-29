import React from 'react'
import EditAdvertImage from './edit-image'
import EditAdvertTourRequest from './edit-tour-request'
import "./editImageAndTourRequest.scss"
import Spacer from '@/components/common/misc/spacer'

const EditImageAndTourRequest = ({advertById}) => {
  
  return (
    <div className="container">
    <div className="container edit-imagetabs-container">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            href="#editImages"
            data-bs-toggle="tab"
          >
            Edit Images
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            href="#editTourRequest"
            data-bs-toggle="tab"
          >
            Edit Tour Requests
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="editImages" role="tabpanel">
          <Spacer/>
          <EditAdvertImage advertById={advertById}/>
        </div>
        <div className="tab-pane fade" id="editTourRequest" role="tabpanel">
          <EditAdvertTourRequest tourRequest={advertById.tourRequest}/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EditImageAndTourRequest