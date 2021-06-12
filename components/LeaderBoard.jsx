/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useState, useEffect } from 'react';
import TeamCard from './TeamCard';
import { GameContext } from '../context/gameContext';

const LeaderBoard = () => {
  const { state } = useContext(GameContext);
  const { allTeams, teamCards } = state;
  const [currentTeams, setCurrentTeams] = useState([]);
  const [allTimeLeaders, setAllTimeLeaders] = useState([]);

  useEffect(() => {
    setCurrentTeams(() => teamCards.sort((a, b) => (b.wins === a.wins ? b.highScore - a.highScore : b.wins - a.wins)));
    setAllTimeLeaders(() => allTeams.sort((a, b) => (b.wins === a.wins ? b.highScore - a.highScore : b.wins - a.wins)));
  }, []);
  const currTeams = currentTeams.map((team, i) => <TeamCard team={team} key={i} />);
  const allLeaders = allTimeLeaders.map((team, i) => <TeamCard team={team} key={i} />);

  return (
    <center>
      <h1>Leader Board</h1>
      <h2>Current Teams</h2>
      {currTeams}
      <h2>All Time Leaders</h2>
      {allLeaders}
    </center>

  );
};

export default LeaderBoard;
