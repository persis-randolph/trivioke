/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import React, { Component, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from '../context/gameContext';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      question, triviaRequest, hidden, nextTeam, increaseScore, trigger, count, increaseCount,
    } = this.props;

    function shuffle(answerArr) {
      for (let i = answerArr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [answerArr[i], answerArr[j]] = [answerArr[j], answerArr[i]];
      }
      return answerArr;
    }
    if (question) {
      const answers = [
        <button key="c" type="button" onClick={() => { triviaRequest(); nextTeam(); increaseScore(); increaseCount(); }}>{question.correct_answer}</button>,
        <Link to="/video" onClick={() => nextTeam()}>
          <button key="i1" style={{ display: hidden ? 'inline block' : 'none' }} type="button">{question.incorrect_answers[0]}</button>
        </Link>,
        <Link to="/video" onClick={() => nextTeam()}>
          <button key="i2" style={{ display: hidden ? 'inline block' : 'none' }} type="button">{question.incorrect_answers[1]}</button>
        </Link>,
        <Link to="/video" onClick={() => nextTeam()}>
          <button key="i3" type="button">{question.incorrect_answers[2]}</button>
        </Link>,
      ];
      const shuffleArr = shuffle(answers);
      const multiChoice = [
        <div key="trivia">
          <div key="question"><h3>{(question.question)}</h3></div>
          <div key="answers">{shuffleArr.map((answer, i) => <div key={i}>{answer}</div>)}</div>
        </div>,
      ];
      return (
        <div>
          <h5>
            Questions Answered:
            {' '}
            {count}
          </h5>
          <div>{multiChoice}</div>
        </div>
      );
    }
    return <div>Loading</div>;
  }
}

export default Trivia;

// ** ATTEMPT AT REFACTOR, DID NOT WORK ******
// const Trivia = () => {
//   const {
//     state, triviaRequest, nextTeam, increaseScore,
//   } = useContext(GameContext);

//   const {
//     question,
//     currTeam,
//     team1,
//     team2,
//     visibility,
//     hidden,
//   } = state;

//   function shuffle(answerArr) {
//     for (let i = answerArr.length - 1; i > 0; i -= 1) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [answerArr[i], answerArr[j]] = [answerArr[j], answerArr[i]];
//     }
//     return answerArr;
//   }

//   const answers = [
//     <button key="c" type="button" onClick={() => { triviaRequest(); nextTeam(); increaseScore(); }}>{question.correct_answer}</button>,
//     <Link to="/video">
//       <button key="i1" style={{ display: hidden ? 'block' : 'none' }} type="button">{question.incorrect_answers[0]}</button>
//     </Link>,
//     <Link to="/video">
//       <button key="i2" style={{ display: hidden ? 'block' : 'none' }} type="button">{question.incorrect_answers[1]}</button>
//     </Link>,
//     <Link to="/video">
//       <button key="i3" type="button">{question.incorrect_answers[2]}</button>
//     </Link>,
//   ];

//   const shuffleArr = shuffle(answers);

//   const multiChoice = [
//     <div key="trivia">
//       <div key="question"><h3>{(question.question)}</h3></div>
//       <div key="answers">{shuffleArr.map((answer, i) => <div key={i}>{answer}</div>)}</div>
//     </div>,
//   ];

//   return (
//     <div>
//       {question ? <div>{multiChoice}</div> : <div>Loading</div>}
//     </div>
//   );
// };
