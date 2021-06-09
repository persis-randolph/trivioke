/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
// import SignUp from '../components/signUp.jsx';
import Login from '../components/login.jsx';
import VideoPlayer from '../components/player.jsx';
import Load from '../components/load.jsx';
import Game from '../components/game.jsx';
import Profile from '../components/Profile.jsx';
import Navbar from '../components/Nav.jsx';
import './index.css';
import { UserContextProvider } from '../pages/userContext';

const routing = (
  <UserContextProvider>
    <Router>
      <div>
        <Navbar />
        <center>
          <img
            src="/logo.png"
            alt="logo"
          />
        </center>
        <Route exact path="/" component={Login} />
        {/* <Route exact path="/signup" component={SignUp} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/trivia" component={Load} />
        <Route exact path="/video" component={VideoPlayer} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/profile" component={Profile} />
      </div>
    </Router>
  </UserContextProvider>
);

ReactDOM.render(routing, document.getElementById('index'));
