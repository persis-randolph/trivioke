import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../context/gameContext';

const LeaderBoard = () => {
  const { state } = useContext(GameContext);
  const { allTeams, teamCards} = state;

  useEffect(() => {
    console.log('allTeams: ', allTeams, 'teamCards: ', teamCards)
  }, [])

  return (
    <h1>Leader Board</h1>
  )
}

export default LeaderBoard;