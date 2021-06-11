/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import React, { useState, createContext } from 'react';
import axios from 'axios';

const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  // get what we need from UserContext
  const { userInfo } = useContext(UserContext);

  // const [videoBool, setVideoBool] = useState(false);
  const [video, setVideo] = useState({ song: 'Frankie Valli - Can\'t Take My Eyes Off Of You Karaoke Lyrics', uri: 'UXYjQa_osMI' });
  const [videos, setVideos] = useState([]);
  const [visibility, setVisibility] = useState(true);
  const [question, setQuestion] = useState(null);

  // Game Options (Load.jsx) State
  const [diff, setDiff] = useState('medium');
  const [category, setCategory] = useState(9);
  const [trivia, setTrivia] = useState(false);

  // Team State
  const [teams, setTeams] = useState([]);
  const [currTeam, setCurrTeam] = useState(teams[0]);
  const [existingTeams, setExistingTeams] = useState([]);

  

  // Answered Questions Count - starts at 0, goes up each time a question is completed
  const [count, setCount] = useState(0);
  // boolean for if the game should end
  const [endGame, setEndGame] = useState(false);

  const [triviaBool, setTriviaBool] = useState(false);
  const [hidden] = useState(false);

  const triviaRequest = () => {
    const uri = !triviaBool ? '/trivia/multi' : '/trivia/bool';
    axios.get(uri, {
      params: {
        categoryID: sessionStorage.category,
        diff: sessionStorage.diff,
      },
    }).then(({ data }) => {
      setQuestion(data);
    }).catch((err) => {
      console.error(err);
    });
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

  //* for getting and sending team info to/from db
  const getTeams = (googleId) => {
    axios.get('/teams', { params: {googleId} })
    .then(({ data }) => {
      console.log(data)
      setExistingTeams(data);
    })
    .catch(err => console.log(err))
  }

  const postTeam = async (teamName) => {
    const { googleId } = userInfo;
    try {
      const newTeam = axios.post('/teams', { googleId, teamName })
      setExistingTeams(prevTeams => [...prevTeams, newTeam]);
    }
    catch (err) {
      console.log(err)
    }
  }


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
  const addSongsToState = () => {
    // console.log('hits addsongs')
    axios.get('/songs')
      .then(({ data }) => {
        if (data.length) {
          const rand = Math.floor(Math.random() * (data.length));
          setVideos(data);
          setVideo(data[rand]);
        } else {
          console.log('PATH: there is nothing in the db');
          axios.post('/songs')
            .then(() => {
              axios.get('/songs')
                .then(({ data }) => {
                  const rand = Math.floor(Math.random() * (data.length - 1)) + 1;
                  setVideo(data[rand]);
                  setVideos(data);
                });
            });
        }
      });
  };

  const halveChoices = () => {
    setVisibility((prevVis) => !prevVis);
  };

  const state = {
    video,
    setVideo,
    videos,
    visibility,
    question,
    currTeam,
    setCurrTeam,
    teams,
    existingTeams,
    setTeams,
    diff,
    setDiff,
    category,
    setCategory,
    trivia,
    setTrivia,
    triviaBool,
    setTriviaBool,
    hidden,
    count,
    setCount,
    setEndGame,
  };

  const gameProps = {
    state,
    triviaRequest,
    changeCat,
    nextTeam,
    getTeams,
    postTeam,
    // triggerVideo,
    increaseScore,
    halveChoices,
    addSongsToState,
    increaseCount,
  };

  return (
    <GameContext.Provider value={gameProps}>
      {children}
    </GameContext.Provider>
  );
}

export { GameContextProvider, GameContext };
