import React, { useState, createContext } from 'react';
import axios from 'axios';

const GameContext = createContext();

function GameContextProvider({ children }) {

  const [videoBool, setVideoBool] = useState(false);
  const [video, setVideo] = useState({ song: 'Frankie Valli - Can\'t Take My Eyes Off Of You Karaoke Lyrics', uri: 'UXYjQa_osMI' });
  const [videoBank, setVideoBank] = useState([]);
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
    setVideoBool(prevVid => !prevVid)
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

  const addSongsToState = () => {
    console.log('hits addsongs')
    axios.get('/songs')
      .then(({ data }) => {
        if (data.length) {
          console.log('PATH: there is existing data in the db');
          const rand = Math.floor(Math.random() * (data.length));
          setVideo(data[rand]);
          setVideoBank(data);
          console.log('video data: ', data, 'videoBank state: ', videoBank)
        } else {
          console.log('PATH: there is nothing in the db');
          axios.post('/songs')
            .then(() => {
              axios.get('/songs')
                .then(({ data }) => {
                  const rand = Math.floor(Math.random() * (data.length - 1)) + 1;
                  setVideo(data[rand]);
                  setVideoBank(data);
                });
            });
        }
      });
  }

  const handleClick = () => {
    setVisibility(prevVis => !prevVis);
  }



  const state = {
    videoBool,
    video,
    setVideo,
    videoBank,
    visibility,
    question,
    currTeam,
    team1,
    team2,
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

export {GameContextProvider, GameContext}