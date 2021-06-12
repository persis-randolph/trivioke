import React, { useEffect, useContext } from 'react';
// import { GameContext } from '../context/gameContext';

const TeamCard = ({ team }) => {
  // const { state } = useContext(GameContext);
  // const { allTeams, teamCards } = state;
  const { teamName, wins, losses, highScore, currentScore } = team;

  return (
    <div>
      <h4>{teamName}</h4>
      <h6>Wins: {wins}</h6>
      <h6>Losses: {losses}</h6>
      <h6>High Score: {highScore}</h6>
    </div>
  )
}

export default TeamCard;