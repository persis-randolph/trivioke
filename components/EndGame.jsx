/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { GameContext } from '../context/gameContext';

const EndGame = () => {
  const { halveChoices } = useContext(GameContext);

  return (
    <h1>Placeholder for EndGame Component</h1>
  );
};

export default EndGame;
