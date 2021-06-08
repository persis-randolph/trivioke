import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../pages/userContext';
const Navbar = () => {
  const { isLoggedIn, userInfo } = useContext(UserContext);


  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to={isLoggedIn ? "/profile" : "/login"} classname="nav-link">{isLoggedIn ? "GamerCard" : "Login"}</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;