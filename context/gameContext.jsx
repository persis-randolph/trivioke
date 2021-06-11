/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import React, { useState, createContext } from 'react';
import axios from 'axios';

const GameContext = createContext();

function GameContextProvider({ children }) {
  // const [videoBool, setVideoBool] = useState(false);
  const [video, setVideo] = useState({ song: 'Frankie Valli - Can\'t Take My Eyes Off Of You Karaoke Lyrics', uri: 'UXYjQa_osMI' });
  const [videos, setVideos] = useState([]);
  const [visibility, setVisibility] = useState(true);
  const [question, setQuestion] = useState(null);

  // Game Options (Load.jsx) State
  const [diff, setDiff] = useState('medium');
  const [category, setCategory] = useState(9);

  // Team State
  const [teams, setTeams] = useState([]);
  const [currTeam, setCurrTeam] = useState(teams[0]);

  // Answered Questions Count - starts at 0, goes up each time a question is completed
  const [count, setCount] = useState(0);
  // boolean for if the game should end
  const [endGame, setEndGame] = useState(false);

  const [triviaBool, setTriviaBool] = useState(false);
  const [trivia, setTrivia] = useState(false);

  const triviaRequest = async () => {
    // const uri = !triviaBool ? '/trivia/multi' : '/trivia/bool';
    try {
      const { data } = await axios.get('/trivia/multi', {
        params: {
          categoryID: sessionStorage.category,
          diff: sessionStorage.diff,
        },
      });
      setQuestion(data);
    } catch (error) {
      console.error(error);
    }
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
    for (let i = 0; i < teams.length; i++) {
      if (currTeam === teams[i]) {
        if (i + 1 !== teams.length) {
          setCurrTeam(teams[i + 1]);
        } else {
          setCurrTeam(teams[0]);
        }
      }
    }
  };

  // const triggerVideo = () => {
  //   setVideoBool(prevVid => !prevVid)
  // };

  const increaseScore = () => {
    for (let i = 0; i < teams.length; i++) {
      if (currTeam === teams[i]) {
        sessionStorage.setItem(`score${i + 1}`, (Number(sessionStorage[`score${i + 1}`]) + 1));
        setVisibility(true);
      }
    }
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  // add songs from database to state. Should only run on start of a new game
  const addSongsToState = async () => {
    try {
      const { data } = await axios.get('/songs');
      if (data.length) {
        const rand = Math.floor(Math.random() * (data.length));
        setVideos(data);
        setVideo(data[rand]);
      } else {
        await axios.post('/songs');
        const { data } = await axios.get('/songs');
        const rand = Math.floor(Math.random() * (data.length - 1)) + 1;
        setVideos(data);
      }
    } catch (err) {
      console.log('error with adding songs to state ', err);
    }
  };

  const halveChoices = () => {
    setVisibility((prevVis) => !prevVis);
  };

  // const begin = () => {
  //   sessionStorage.setItem('diff', diff);
  //   sessionStorage.setItem('category', category);

  //   // as a mapping function
  //   teams.forEach((teamName, index) => {
  //     sessionStorage.setItem(`team${index + 1}`, teamName);
  //     sessionStorage.setItem(`score${index + 1}`, 0);
  //   });
  //   setTrivia(true);
  // };

  const end = () => {
    sessionStorage.clear();
    setTrivia(false);
    setCount(0);
    setTeams([]);
    setCurrTeam(teams[0]);
  };

  const state = {
    video,
    videos,
    visibility,
    question,
    trivia,
    currTeam,
    setCurrTeam,
    teams,
    setTeams,
    diff,
    setDiff,
    category,
    setCategory,
    setTrivia,
    triviaBool,
    setTriviaBool,
    // hidden,
    count,
    setCount,
    setEndGame,
    setVideo,
    setQuestion,
  };

  const gameProps = {
    state,
    triviaRequest,
    changeCat,
    nextTeam,
    // triggerVideo,
    increaseScore,
    halveChoices,
    addSongsToState,
    // begin,
    increaseCount,
    end,
  };

  return (
    <GameContext.Provider value={gameProps}>
      {children}
    </GameContext.Provider>
  );
}

export { GameContextProvider, GameContext };
