/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
const React = require('react');
const ReactDOM = require('react-dom');
const {
  Switch, Route, BrowserRouter: Router,
} = require('react-router-dom');
const Login = require('../components/login.jsx');
const VideoPlayer = require('../components/player.jsx');
const Load = require('../components/load.jsx');
const Game = require('../components/game.jsx');
const Navbar = require('../components/Nav.jsx');
const EndGame = require('../components/EndGame.jsx');
const LeaderBoard = require('../components/LeaderBoard');
const { UserContextProvider } = require('../context/userContext');
const { GameContextProvider } = require('../context/gameContext');
require('./index.css');

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
            <Route exact path="/endgame" component={EndGame} />
            <Route exact path="/LeaderBoard" component={LeaderBoard} />
          </Switch>
        </div>
      </Router>
    </GameContextProvider>
  </UserContextProvider>
);

ReactDOM.render(routing, document.getElementById('index'));
