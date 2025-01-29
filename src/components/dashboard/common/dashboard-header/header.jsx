import React from 'react'
import "./style.scss"

const DashboardHeader = ({title}) => {
  return (
    <div className='dashboard-header'>
        <h2>Home / {title}</h2>
    </div>
  )
}

export default DashboardHeader