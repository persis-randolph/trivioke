/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import TeamCard from './TeamCard';
import { GameContext } from '../context/gameContext';

const LeaderBoard = () => {
  const { state } = useContext(GameContext);
  const { allTeams, teamCards } = state;

  const currentTeams = teamCards.map((team, i) => <TeamCard team={team} key={i} />);

  const allTimeLeaders = allTeams.map((team, i) => <TeamCard team={team} key={i} />);

  return (
    <center>
      <h1>Leader Board</h1>
      <h2>Current Teams</h2>
      {currentTeams}
      <h2>All Time Leaders</h2>
      {allTimeLeaders}
    </center>

  );
};

export default LeaderBoard;
