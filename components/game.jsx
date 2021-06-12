/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Lifelines from './lifelines';
import Trivia from './trivia';
import Scoreboard from './scoreBoard';
import { GameContext } from '../context/gameContext';
import Countdown from './Countdown';

function Game(props) {
  const {
    state,
    triviaRequest,
    changeCat,
    nextTeam,
    increaseScore,
    addSongsToState,
    increaseCount,
  } = useContext(GameContext);

  const {
    // videoBool,
    question,
    currTeam,
    visibility,
    // hidden,
    count,
    endGame,
    teams,
  } = state;

  useEffect(() => {
    addSongsToState();
  }, []);
  return (
    <center>
      {/* this line decides the amount of rounds */}
      {count >= (teams.length * 1) ? (
        <Redirect to="/endgame" />
      ) : (
        <div>
          <Countdown />
          <Lifelines />
          <Trivia />
          <Scoreboard />
        </div>
      )}
    </center>
  );
}

// triviaRequest() {
//   axios.get('/trivia/multi', {
//     params: {
//       categoryID: sessionStorage.category,
//       diff: sessionStorage.diff,
//     },
//   }).then(({ data }) => {
//     this.setState({ question: data });
//   }).catch((err) => {
//     console.error(err);
//   });
// }

// boolRequest() {
//   axios.get('/trivia/bool', {
//     params: {
//       categoryID: sessionStorage.category,
//       diff: sessionStorage.diff,
//     },
//   }).then(({ data }) => {
//     this.setState({ question: data });
//   }).catch((err) => {
//     console.error(err);
//   });
// }

// changeCat() {
//   const cats = [9, 11, 14, 15, 17, 22, 23, 26, 27];
//   const rand = cats[Math.floor(Math.random() * cats.length)];
//   const url = `https://opentdb.com/api.php?amount=1&category=${rand}&difficulty=${sessionStorage.diff}&type=multiple`;
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       this.setState({ question: data.results[0] });
//       sessionStorage.setItem('category', rand);
//     })
//     .catch((err) => { console.error(err); });
// }

// nextTeam() {
//   const { currTeam } = this.state;
//   return currTeam === 'team1' ? this.setState({ currTeam: 'team2' })
// : this.setState({ currTeam: 'team1' });
// }

// triggerVideo() {
//   this.setState((prevState) => ({ video: !prevState.video }));
// }

// increaseScore() {
//   const { currTeam } = this.state;
//   if (currTeam === 'team1') {
//     sessionStorage.setItem('score1', (Number(sessionStorage.score1) + 1));
//     this.setState(() => ({
//       visibility: true,
//     }));
//   } else {
//     sessionStorage.setItem('score2', (Number(sessionStorage.score2) + 1));
//     this.setState(() => ({
//       visibility: true,
//     }));
//   }
// }

// componentDidMount() {
//   this.triviaRequest();
// }

// halveChoices() {
//   const { visibility } = this.state;
//   this.setState({ visibility: !visibility });
// }

//   render() {
//     // const {
//     //   question, visibility, currTeam, team1, team2, video, bool,
//     // } = this.state;
//     const { name1, name2 } = this.props;
//     if (!video) {
//       return (
//         <center>
//           <div>
//             <Lifelines
//               handleChange={this.handleChange}
//               triviaRequest={this.triviaRequest}
//               halveChoices={this.halveChoices}
//               changeCat={this.changeCat}
//               bool={bool}
//             />
//             <Trivia
//               triviaRequest={this.triviaRequest}
//               handleChange={this.handleChange}
//               question={question}
//               hidden={visibility}
//               nextTeam={this.nextTeam}
//               increaseScore={this.increaseScore}
//               trigger={this.triggerVideo}
//               bool={bool}
//             />
//             <Scoreboard
//               currTeam={currTeam}
//               team1={team1}
//               team2={team2}
//               name1={name1}
//               name2={name2}
//             />
//           </div>
//         </center>
//       );
//     }
//     return (
//       <VideoPlayer />
//     );
//   }
// }
export default Game;
