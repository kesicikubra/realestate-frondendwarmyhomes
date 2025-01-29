import React from 'react'
import "./main-menubar.scss"
import MainMenuBar from './MainMenuBar'

const Header = ({params}) => {
  return (
    <>
		<MainMenuBar params={params}/>
	</>
  )
}

export default Header