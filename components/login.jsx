/* eslint-disable no-undef */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { UserContext } from '../context/userContext';
import { GameContext } from '../context/gameContext';
import clientId from '../src/googleConfig';

const Login = () => {
  const [showLoginButton, setShowLoginButton] = useState(true);
  const { loginUser, logoutUser, isLoggedIn } = useContext(UserContext);
  const { getTeams } = useContext(GameContext);

  const onLoginSuccess = (res) => {
    if (!isLoggedIn) {
      loginUser(res.profileObj);
      getTeams(res.profileObj.googleId);
    }
    setShowLoginButton(false);
    sessionStorage.clear();
  };

  const onSignoutSuccess = () => {
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
