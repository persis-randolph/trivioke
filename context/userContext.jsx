/* eslint-disable react/prop-types */
/* eslint-disable no-console */

import React, { useState, createContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginUser = (userData) => {
    axios.get('/users', { params: userData })
      .then(({ data }) => {
        const { googleId, username } = data;
        setUserInfo({ googleId, username });
        setIsLoggedIn(true);
      })
      .catch((err) => console.log(err));
  };

  const logoutUser = () => {
    setUserInfo({});
    setIsLoggedIn(false);
  };

  const userProps = {
    userInfo,
    loginUser,
    logoutUser,
    isLoggedIn,
  };

  return (
    <UserContext.Provider value={userProps}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
