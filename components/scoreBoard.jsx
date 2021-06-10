/* eslint-disable no-undef */

import React, { useContext } from 'react';
import { GameContext } from '../context/gameContext';

const Scoreboard = () => {
  const { state } = useContext(GameContext);
  const { teams, currTeam } = state;

  const loadScoreBoard = () => (
    teams.map((teamName, i) => (
      <tr id={`team${i + 1}`} key={i} style={{ background: currTeam === teamName ? 'lightgreen' : 'transparent' }}>
        <td>{sessionStorage[`team${i + 1}`]}</td>
        <td>{sessionStorage[`score${i + 1}`]}</td>
      </tr>
    ))
  );

  return (
    <div>
      <div>Scoreboard</div>
      <table
        className="table"
        style={{ width: '400px' }}
      >
        <thead>
          <tr>
            <th scope="col">Team</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {loadScoreBoard()}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
