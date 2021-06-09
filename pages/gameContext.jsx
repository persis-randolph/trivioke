import React, { useState, createContext } from 'react';
import axios from 'axios';

const GameContext = createContext();

function GameContextProvider({ children }) {

  const [video, setVideo] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [question, setQuestion] = useState(null);
  const [currTeam, setCurrTeam] = useState('team1');
  const [team1, setTeam1] = useState(0);
  const [team2, setTeam2] = useState(0);

  
  const gameProps = {
    
  };

  return (
    <GameContext.Provider value={gameProps}>
      {children}
    </GameContext.Provider>
  )
}
