/* eslint-disable react/prop-types */

import React, { useState, createContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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
      .then(Swal.fire({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        icon: 'success',
        title: 'Signed in successfully',
      }));
    // .catch((err) => console.log(err));
  };

  const logoutUser = () => {
    setUserInfo({});
    setIsLoggedIn(false);
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      icon: 'success',
      title: 'Signed out successfully',
    });
  };

  //* Here's where we'll update a player's stats. Update locally and
  //* then call to the server to update the player's info in the db
  // const adjustRecord = () => {

  // }

  // const checkHighScore = (score) => {
  //   if (score > highScore) {
  //     setHighScore(score);
  //     axios.patch('/users/stats:id' {params: score})
  //   }
  // }

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
