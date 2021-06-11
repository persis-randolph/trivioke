/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { GameContext } from '../context/gameContext';

const Scoreboard = () => {
  // load score board
  const { state } = useContext(GameContext);
  const { teams, currTeam, setCurrTeam } = state;
  //  setCurrTeam( teams[0] )

  const loadScoreBoard = () =>
    // console.log('teams are: ', teams, 'currentTeam is: ', currTeam);
    (
      teams.map((teamName, i) => (
        <tr id={teamName + i} style={{ background: currTeam === teamName ? 'lightgreen' : 'transparent' }}>
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
          {/* another place where the amount of teams needs to be changed */}
          {/* <tr id="team1" style={{ background: currTeam === 'team1' ? 'lightgreen' : 'transparent' }}>
          <td>{sessionStorage.team1}</td>
          <td>{sessionStorage.score1}</td>
        </tr>
        <tr id="team2" style={{ background: currTeam === 'team2' ? 'lightgreen' : 'transparent' }}>
          <td>{sessionStorage.team2}</td>
          <td>{sessionStorage.score2}</td>
        </tr> */}
          {loadScoreBoard()}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
