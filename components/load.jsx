/* global sessionStorage */

import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Filters from './filters';
import Teams from './Teams';
import Game from './game';
import { GameContext } from '../context/gameContext';

const Load = () => {

  const { state, triviaRequest, boolRequest, handleTeams, getTeams } = useContext(GameContext);

  const {
    teams,
    diff,
    setDiff,
    category,
    trivia,
    setTrivia,
  } = state;

  const begin = () => {
    sessionStorage.setItem('diff', diff);
    sessionStorage.setItem('category', category);

    // as a mapping function
    teams.forEach((teamName, index) => {
      sessionStorage.setItem(`team${index + 1}`, teamName);
      sessionStorage.setItem(`score${index + 1}`, 0);
    });
    setTrivia(true);
  };

  const categories = {
    9: 'General',
    11: 'Movies',
    14: 'TV',
    15: 'Video Games',
    17: 'Science',
    22: 'Geography',
    23: 'History',
    26: 'Celebs',
    27: 'Animals',
  };

  const categoryName = categories[category];

  if (!trivia) {
    return (
      <center>
        <div>
          <div key="team">
            <Teams />
          </div>
          <Filters />
          <h5>
            Selected Category:
            {' '}
            {categoryName}
          </h5>
          <table style={{
            alignItems: 'center', width: '400px', display: 'flex', justifyContent: 'center',
          }}
          >
            <thead>
              <tr style={{ cellpadding: 8, cellspacing: 8 }}>
                <td><button type="button" name="diff" id="easy" onClick={() => { setDiff('easy'); }}><h5>Easy</h5></button></td>
                <td><button type="button" name="diff" id="medium" onClick={() => { setDiff('medium'); }}><h5>Medium</h5></button></td>
                <td><button type="button" name="diff" id="hard" onClick={() => { setDiff('hard'); }}><h5>Hard</h5></button></td>
              </tr>
            </thead>
          </table>
          <div key="begin">
            <h5>Choose Your Question Type</h5>
            <Link to="/game">
              <button type="button" onClick={() => { handleTeams(); begin(); triviaRequest(); }}><h5>Multiple Choice</h5></button>
            </Link>
          </div>
          <div key="bool">
            <Link to="/game">
              <button type="button" onClick={() => { handleTeams(); begin(); boolRequest(); }}><h5>True/False</h5></button>
            </Link>
          </div>
        </div>
      </center>
    );
  }
  return (
    <div>
      <Game category={category} diff={diff} />
    </div>
  );
};

export default Load;
