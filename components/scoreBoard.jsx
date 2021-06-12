/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { GameContext } from '../context/gameContext';

const Scoreboard = () => {
  const { state } = useContext(GameContext);
  const { teams, currTeam, setCurrTeam } = state;

  const loadScoreBoard = () =>
    (
      teams.map((teamName, i) => (
        <tr key={i} id={teamName + i} style={{ background: currTeam === teamName ? 'lightgreen' : 'transparent' }}>
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
