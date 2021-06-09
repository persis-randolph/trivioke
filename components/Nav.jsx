import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../pages/userContext';
const Navbar = () => {
  const { isLoggedIn, userInfo } = useContext(UserContext);
  console.log('logged in?', isLoggedIn)

  // this should dynamically render profile or login once isLoggedIn is being set correctly
  // <Link to={ isLoggedIn ? "/profile" : "/login" } className="nav-link">{ isLoggedIn ? "Player Card" : "Login" }</Link>
  
  // we can add other stuff if needed, or do away with the navbar and just have a link or button somewhere
  
  return (
    <nav className="navbar">
      {/* <ul className="nav-list">
        <li className="nav-item"> */}
          <Link to="/profile" className="nav-link"> GamerCard </Link>
        {/* </li>
        <li className="nav-item"> */}
          <Link to="/login" className="nav-link"> Login </Link>
        {/* </li>
      </ul> */}
    </nav>
  )
}

export default Navbar;