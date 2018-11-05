/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import SignUp from '../components/signUp.jsx';
import Login from '../components/login.jsx';
import VideoPlayer from '../components/player.jsx';
import Load from '../components/load.jsx';
import Game from '../components/game.jsx';
import './index.css';

const Front = () => (
  <div>
    <SignUp />
    <Login />
  </div>
);

const routing = (
  <Router>
    <div>
      <div>
        <Link to="/">SignUp/Login</Link>
      </div>
      <center>
        <img
          src="/logo.png"
          alt="logo"
        />
      </center>
      <Route exact path="/" component={Front} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/trivia" component={Load} />
      <Route exact path="/video" component={VideoPlayer} />
      <Route exact path="/game" component={Game} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('index'));
