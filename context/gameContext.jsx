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

  const triviaRequest = () => {
    const url = `https://opentdb.com/api.php?amount=1&category=${sessionStorage.category}&difficulty=${sessionStorage.diff}&type=multiple`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setQuestion(data.results[0]))
      .catch((err) => { console.error(err); });
  };

  const changeCat = () => {
    const cats = [9, 11, 14, 15, 17, 22, 23, 26, 27];
    const rand = cats[Math.floor(Math.random() * cats.length)];
    const url = `https://opentdb.com/api.php?amount=1&category=${rand}&difficulty=${sessionStorage.diff}&type=multiple`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.results[0]);
        sessionStorage.setItem('category', rand);
      })
      .catch((err) => { console.error(err); });
  };

  const nextTeam = () => {
    return currTeam === 'team1' ? setCurrTeam('team2') : setCurrTeam('team1');
  };

  const triggerVideo = () => {
    setVideo(prevVid => !prevVid)
    // this.setState((prevState) => ({ video: !prevState.video }));
  };

  const increaseScore = () => {
    // const { currTeam } = this.state;
    if (currTeam === 'team1') {
      sessionStorage.setItem('score1', (Number(sessionStorage.score1) + 1));
      setVisibility(true);
    } else {
      sessionStorage.setItem('score2', (Number(sessionStorage.score2) + 1));
      setVisibility(true);
    }
  };


  
  const gameProps = {
    video, 
    visibility,
    question,
    currTeam,
    team1,
    team2,
    triviaRequest,
    changeCat,
    nextTeam,
    triggerVideo,
    increaseScore
  };

  return (
    <GameContext.Provider value={gameProps}>
      {children}
    </GameContext.Provider>
  )
}

export {GameContextProvider, GameContext}