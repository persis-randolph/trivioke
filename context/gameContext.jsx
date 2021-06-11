/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, createContext } from 'react';
import axios from 'axios';

const GameContext = createContext();

function GameContextProvider({ children }) {
  // const [videoBool, setVideoBool] = useState(false);
  const [video, setVideo] = useState({ song: 'Frankie Valli - Can\'t Take My Eyes Off Of You Karaoke Lyrics', uri: 'UXYjQa_osMI' });
  const [videos, setVideos] = useState([]);
  const [visibility, setVisibility] = useState(true);
  const [question, setQuestion] = useState({});
  const [currTeam, setCurrTeam] = useState('team1');
  const [team1, setTeam1] = useState(0);
  const [team2, setTeam2] = useState(0);
  const [triviaBool, setTriviaBool] = useState(false);
  const [diff, setDiff] = useState('easy');
  const [category, setCategory] = useState(9);
  const [trivia, setTrivia] = useState(false);

  const triviaRequest = async () => {
    // const uri = !triviaBool ? '/trivia/multi' : '/trivia/bool';
    await axios.get('/trivia/multi', {
      params: {
        categoryID: sessionStorage.category,
        diff: sessionStorage.diff,
      },
    }).then(({ data }) => {
      console.log(data);
      setQuestion(data);
      console.log('in context', question);
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

  const nextTeam = () => (currTeam === 'team1' ? setCurrTeam('team2') : setCurrTeam('team1'));

  // const triggerVideo = () => {

  //   // setVideoBool(prevVid => !prevVid)
  //   // this.setState((prevState) => ({ video: !prevState.video }));
  // };

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

  // add songs from database to state. Should only run on start of a new game
  const addSongsToState = () => {
    // console.log('hits addsongs')
    axios.get('/songs')
      .then(({ data }) => {
        if (data.length) {
          console.log('PATH: there is existing data in the db');
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

  const handleClick = () => {
    setVisibility((prevVis) => !prevVis);
  };
  const begin = () => {
    sessionStorage.setItem('diff', diff);
    sessionStorage.setItem('category', category);
    sessionStorage.setItem('team1', team1);
    sessionStorage.setItem('team2', team2);
    sessionStorage.setItem('score1', 0);
    sessionStorage.setItem('score2', 0);
    setTrivia(true);
  };

  const state = {
    // videoBool,
    video,
    videos,
    visibility,
    question,
    trivia,
    currTeam,
    team1,
    team2,
    triviaBool,
    category,
    diff,
    setTriviaBool,
    setCategory,
    setDiff,
    setVideo,
    setTrivia,
    setQuestion,
  };

  const gameProps = {
    state,
    triviaRequest,
    changeCat,
    nextTeam,
    // triggerVideo,
    increaseScore,
    handleClick,
    addSongsToState,
    begin,
  };

  return (
    <GameContext.Provider value={gameProps}>
      {children}
    </GameContext.Provider>
  );
}

export { GameContextProvider, GameContext };
