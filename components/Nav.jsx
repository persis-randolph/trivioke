/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { GameContext } from '../context/gameContext';

const Navbar = () => {
  const { isLoggedIn, userInfo } = useContext(UserContext);
  const { end } = useContext(GameContext);

  // this should dynamically render profile or login once isLoggedIn is being set correctly
  // <Link to={ isLoggedIn ? "/profile" : "/login" }
  // className="nav-link">{ isLoggedIn ? "Player Card" : "Login" }</Link>

  // we can add other stuff if needed,
  // or do away with the navbar and just have a link or button somewhere

  return (
    <nav className="navbar">
      <Link to="/profile" className="nav-link"> GamerCard </Link>
      <Link to="/LeaderBoard" className="nav-link"> LeadeBoard </Link>
      <Link to="/login" className="nav-link"> Login/Logout </Link>
      <Link to="/load" className="nav-link" onClick={() => { end(); }}> New Game </Link>
    </nav>
  );
};

export default Navbar;
