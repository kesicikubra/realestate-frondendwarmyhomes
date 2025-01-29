import React from 'react'
import "./style.scss"
import Link from 'next/link'
import moment from 'moment'

const DashboardEditAdvertFormUserInfoSection = ({data}) => {


    const { first_name, last_name, phone_number, email, update_at, create_at, id } = data?.object?.user

    const { favorite_number, tour_request_number, view_count, built_in } = data?.object


    const updateDate = update_at == null ? "Has not been updated" : moment(update_at).format("DD/MM/YYYY");
    const createDate = moment(create_at).format("DD/MM/YYYY");

  return (
    <div className='container user-info'>
        <div className="row">
            <div className="col-12 col-lg-4">
                <p>
                    <Link href={`/dashboard/users/${id}`}>
                        {first_name} {last_name}
                    </Link>
                </p>
                <p>{email}</p>
                <p>{phone_number}</p>
            </div>
            <div className="col-12 col-lg-4">
                <p>View : {view_count}</p>
                <p>Favorites : {favorite_number}</p>
                <p>Tour Requests : {tour_request_number}</p>
            </div>
            <div className="col-12 col-lg-4">
                <p>Create Date : {createDate}</p>
                <p>Update Date : {updateDate}</p>
                <p>Built In : {String(built_in)}</p>
            </div>
        </div>
    </div>
  )
}

export default DashboardEditAdvertFormUserInfoSection