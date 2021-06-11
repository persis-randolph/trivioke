/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { UserContext } from '../context/userContext';
import { GameContext } from '../context/gameContext';
import clientId from '../src/googleConfig';

const Login = () => {
  const [showLoginButton, setShowLoginButton] = useState(true);
  // const [userInfo, setUserInfo] = useState({});
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loginUser, logoutUser } = useContext(UserContext);
  const { getTeams } = useContext(GameContext);

  const onLoginSuccess = async (res) => {
    // console.log('[Login Success] currentUser:', res.profileObj);
    await getTeams(res.profileObj.googleId);
    loginUser(res.profileObj);
    setShowLoginButton(false);
    setShowLogoutButton(true);
    // console.log('userInfo in login: ', userInfo);
    sessionStorage.clear();
  };

  // const onLoginFailure = () => {
  //   // console.log('[Login failed] res:', res);
  // };

  const onSignoutSuccess = () => {
    alert('You have been logged out successfully');
    // console.clear();
    setShowLoginButton(true);
    logoutUser();
  };

  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',
      }}
      >
        {showLoginButton ? (
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onLoginSuccess}
            // onFailure={onLoginFailure}
            cookiePolicy="single_host_origin"
            isSignedIn
          />
        ) : (
          <div>
            <GoogleLogout
              clientId={clientId}
              buttonText="Sign Out"
              onLogoutSuccess={onSignoutSuccess}
            />
            <br />
            <Link to="/load">
              <button
                type="button"
                style={{
                  justifyContent: 'center', alignItems: 'center',
                }}
              >
                Go To Game
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
