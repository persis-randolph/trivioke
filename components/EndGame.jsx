/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { GameContext } from '../context/gameContext';

const EndGame = () => {
  const { state } = useContext(GameContext);
  const { count, teams, teamCards } = state;

  const loadTeamScores = () => {
    console.log(sessionStorage);
    // category: "9"
    // diff: "easy"
    // length: 6
    // score1: "0"
    // score2: "1"
    // team1: "biscuits"
    // team2: "rutabagas"
    return (
      teams.map((teamName, i) => (
        <div key={teamName}>
          <h1>
            Team
            {' '}
            {teamName}
          </h1>
          <h3>
            Final Score:
            {' '}
            {sessionStorage[`score${i + 1}`]}
          </h3>
        </div>
      ))
    );
  };

  return (
    <center>
      {loadTeamScores()}
    </center>
  );
};

export default EndGame;
