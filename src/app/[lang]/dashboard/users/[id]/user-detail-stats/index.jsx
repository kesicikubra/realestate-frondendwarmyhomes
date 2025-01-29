import UserAdvertDetail from '@/components/dashboard/users/user-advert-detail'
import UserFavoriteDetail from '@/components/dashboard/users/user-favorite-detail'
import UserLogDetail from '@/components/dashboard/users/user-logs'
import UserTourRequestDetail from '@/components/dashboard/users/user-tour-req-detail'
import React from 'react'
import "./style.scss"

const UserDetailStatistic = ({data}) => {
    const userId=data?.id
  return (
    <div className="container">
        <div className="container dashboard-user-detail">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                href="#tab1"
                data-bs-toggle="tab"
              >
                Adverts
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                href="#tab2"
                data-bs-toggle="tab"
              >
                Tour Requests
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                href="#tab3"
                data-bs-toggle="tab"
              >
                Favorites
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                href="#tab4"
                data-bs-toggle="tab"
              >
                Logs
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane fade show active" id="tab1" role="tabpanel">
              <UserAdvertDetail userId={userId} dataAdverts={data[0]?.adverts}/>
            </div>
            <div className="tab-pane fade" id="tab2" role="tabpanel">
              <UserTourRequestDetail userId={userId} dataTourRequests={data[0]?.tourRequests}/>
            </div>
            <div className="tab-pane fade" id="tab3" role="tabpanel">
              <UserFavoriteDetail userId={userId} dataFavorites={data[0]?.favorites}/>
            </div>
            <div className="tab-pane fade" id="tab4" role="tabpanel">
              <UserLogDetail dataLogs={data[0]?.logs}/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default UserDetailStatistic