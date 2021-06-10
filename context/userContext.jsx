/* eslint-disable react/prop-types */
/* eslint-disable no-console */

import React, { useState, createContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [record, setRecord] = useState({})

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


  //* Here's where we'll update a player's stats. Update locally and
  //* then call to the server to update the player's info in the db
  const adjustRecord = () => {
    
  }

  const checkHighScore = (score) => {
    if (score > highScore) {
      setHighScore(score);
      axios.patch('/users/stats:id' {params: score})
    }
  }



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
