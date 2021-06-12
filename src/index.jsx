/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Switch, Route, Link, BrowserRouter as Router,
} from 'react-router-dom';
import Login from '../components/login.jsx';
import VideoPlayer from '../components/player.jsx';
import Load from '../components/load.jsx';
import Game from '../components/game.jsx';
import Profile from '../components/Profile.jsx';
import Navbar from '../components/Nav.jsx';
import EndGame from '../components/EndGame.jsx';
import LeaderBoard from '../components/LeaderBoard';
import './index.css';
import { UserContextProvider } from '../context/userContext';
import { GameContextProvider } from '../context/gameContext';

const routing = (
  <UserContextProvider>
    <GameContextProvider>
      <Router>
        <div>
          <Navbar />
          <center>
            <img
              src="/logo.png"
              alt="logo"
            />
          </center>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/load" component={Load} />
            <Route exact path="/video" component={VideoPlayer} />
            <Route exact path="/game" component={Game} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/endgame" component={EndGame} />
            <Route exact path="/LeaderBoard" component={LeaderBoard} />
          </Switch>
        </div>
      </Router>
    </GameContextProvider>
  </UserContextProvider>
);

ReactDOM.render(routing, document.getElementById('index'));
