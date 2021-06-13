/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useState, useEffect } from 'react';
import TeamCard from './TeamCard';
import { GameContext } from '../context/gameContext';
import { UserContext } from '../context/userContext';

const LeaderBoard = () => {
  const { state } = useContext(GameContext);
  const { userInfo } = useContext(UserContext);
  const { username } = userInfo;
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
      <h2>
        {username}
        's All Time Leaders
      </h2>
      {allLeaders}
    </center>

  );
};

export default LeaderBoard;
