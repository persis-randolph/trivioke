/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      question, triviaRequest, hidden, nextTeam, increaseScore, trigger,
    } = this.props;
    function escapeHtml(text) {
      return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&ldquo;/g, '"')
        .replace(/&rdquo;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&lsquo;/g, "'")
        .replace(/&rsquo;/g, "'");
    }
    function shuffle(answerArr) {
      for (let i = answerArr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [answerArr[i], answerArr[j]] = [answerArr[j], answerArr[i]];
      }
      return answerArr;
    }
    if (question) {
      const answers = [
        <button key="c" type="button" onClick={() => { triviaRequest(); nextTeam(); increaseScore(); }}>{escapeHtml(question.correct_answer)}</button>,
        <button key="i1" onClick={trigger} style={{ display: hidden ? 'block' : 'none' }} type="button">{escapeHtml(question.incorrect_answers[0])}</button>,
        <button key="i2" onClick={trigger} style={{ display: hidden ? 'block' : 'none' }} type="button">{escapeHtml(question.incorrect_answers[1])}</button>,
        <button key="i3" onClick={trigger} type="button">{escapeHtml(question.incorrect_answers[2])}</button>,
      ];
      const shuffleArr = shuffle(answers);
      const multiChoice = [
        <div key="trivia">
          <div key="question"><h3>{escapeHtml(question.question)}</h3></div>
          <div key="answers">{shuffleArr.map((answer, i) => <div key={i}>{answer}</div>)}</div>
        </div>,
      ];
      return <div>{multiChoice}</div>;
    }
    return <div>Loading</div>;
  }
}
export default Trivia;
