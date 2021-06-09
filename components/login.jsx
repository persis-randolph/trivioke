/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { UserContext } from '../pages/userContext';

const clientId = '385117283096-qa4t4ncd1714jpeq26hbkig65pbntd7h.apps.googleusercontent.com';

const Login = () => {
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loginUser, logoutUser } = useContext(UserContext);

  const onLoginSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
    loginUser(res.profileObj);
    setShowLoginButton(false);
    setShowLogoutButton(true);
    setRedirect(true);

    loginUser(res.profileObj);
  };

  const onLoginFailure = (res) => {
    console.log('[Login failed] res:', res);
  };

  const onSignoutSuccess = () => {
    alert('You have been logged out successfully');
    console.clear();
    setShowLoginButton(true);
    setShowLogoutButton(false);
    logoutUser();
  };

  return (
    <div>
      {redirect ? <div><Redirect to="/trivia" /></div> : (
        <div style={{
          display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',
        }}
        >
          {showLoginButton ? (
            <GoogleLogin
              clientId={clientId}
              buttonText="Login"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy="single_host_origin"
              isSignedIn
            />
          ) : null}
          {showLogoutButton ? (
            <GoogleLogout
              clientId={clientId}
              buttonText="Sign Out"
              onLogoutSuccess={onSignoutSuccess}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       redirect: false,
//       name: '',
//       pw: '',
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange() {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   }

//   handleSubmit() {
//     const loginInfo = this.state;
//     axios({ method: 'get', url: 'http://localhost:8080/login', params: loginInfo })
//       .then(() => {
//         this.setState({ redirect: true });
//       })
//       .catch((err) => console.log(err));
//   }

// render() {
//   const { redirect } = this.state;
//   if (!redirect) {
//     return (
//       <div style={{
//         display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '35vh',
//       }}
//       >
//         <div>
//           <p><strong>Login</strong></p>
//           Username:
//           <input type="text" name="name" onChange={this.handleChange} />
//           Password:
//           <input type="password" name="pw" autoComplete="off" onChange={this.handleChange} />
//           <input type="submit" value="Submit" onClick={this.handleSubmit} />
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div>
//       <Redirect to="/trivia" />
//     </div>
//   );
// }
// }

export default Login;

