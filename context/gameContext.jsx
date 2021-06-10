import React, { useState, createContext } from 'react';
import axios from 'axios';

const GameContext = createContext();

function GameContextProvider({ children }) {

  const [videoBool, setVideoBool] = useState(false);
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
    //needs to be fixed
    //right now it is curr team is team[0]
    // return currTeam === 'team1' ? setCurrTeam('team2') : setCurrTeam('team1');
    for(let i = 0; i < teams.length; i++){
      if(currTeam === teams[i]){
        if(i + 1 !== teams.length){
          setCurrTeam(teams[i + 1])
        } else {
          setCurrTeam(teams[0])
        }
      }
    }
  };

  const triggerVideo = () => {
    setVideoBool(prevVid => !prevVid)
  };

  const increaseScore = () => {
    for(let i = 0; i < teams.length; i++){
    if(currTeam === teams[i]){
      sessionStorage.setItem(`score${i + 1}`, (Number(sessionStorage[`score${i + 1}`]) + 1));
      setVisibility(true);
    }
  }
  };

  // add songs from database to state. Should only run on start of a new game
  const addSongsToState = () => {
    console.log('hits addsongs')
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
      })
  }

  const handleClick = () => {
    setVisibility(prevVis => !prevVis);
  }


  const state = {
    videoBool,
    video,
    setVideo,
    videos,
    visibility,
    question,
    currTeam,
    setCurrTeam,
    teams,
    setTeams,
    diff,
    setDiff,
    category,
    setCategory,
    trivia,
    setTrivia
  }

  const gameProps = {
    state,
    triviaRequest,
    changeCat,
    nextTeam,
    triggerVideo,
    increaseScore,
    handleClick,
    addSongsToState
  };

  return (
    <GameContext.Provider value={gameProps}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContextProvider, GameContext }