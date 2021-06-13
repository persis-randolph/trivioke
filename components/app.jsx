/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Switch, Route, Link, BrowserRouter as Router,
} from 'react-router-dom';
import Login from './login.jsx';
import VideoPlayer from './player.jsx';
import Load from './load.jsx';
import Game from './game.jsx';
import Navbar from './Nav.jsx';
import EndGame from './EndGame.jsx';
import LeaderBoard from './LeaderBoard';
import '../src/index.css';
import { UserContextProvider } from '../context/userContext';
import { GameContextProvider } from '../context/gameContext';

const App = () => (
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
            <Route exact path="/endgame" component={EndGame} />
            <Route exact path="/LeaderBoard" component={LeaderBoard} />
          </Switch>
        </div>
      </Router>
    </GameContextProvider>
  </UserContextProvider>
);

export default App;
