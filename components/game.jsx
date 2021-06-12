/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Lifelines from './lifelines';
import Trivia from './trivia';
import Scoreboard from './scoreBoard';
import { GameContext } from '../context/gameContext';
import Countdown from './Countdown';

function Game() {
  const {
    state,
    addSongsToState,
  } = useContext(GameContext);

  const {
    count,
    teams,
  } = state;

  useEffect(() => {
    addSongsToState();
  }, []);
  return (
    <center>
      {/* this line decides the amount of rounds */}
      {count >= (teams.length * 3) ? (
        <Redirect to="/endgame" />
      ) : (
        <div>
          <Countdown />
          <Lifelines />
          <Trivia />
          <Scoreboard />
        </div>
      )}
    </center>
  );
}

export default Game;
