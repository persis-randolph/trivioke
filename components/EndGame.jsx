/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context/gameContext';

const EndGame = () => {
  const { state, modifyTeamCards } = useContext(GameContext);
  const { count, teams, teamCards } = state;
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setResults(() => {
      const teamScoreMap = teams.reduce((acc, team, i) => {
        acc.push([team, sessionStorage[`score${i + 1}`]]);
        return acc;
      }, []);

      teamScoreMap.sort((a, b) => {
        if (a[1] < b[1]) return 1;
        if (a[1] > b[1]) return -1;
        return 0;
      });

      return teamScoreMap.map((team, i) => {
        if (i === 0) {
          return team[1] === teamScoreMap[i + 1][1] ? [...team, 'draws'] : [...team, 'wins'];
        }
        return team[1] === teamScoreMap[i - 1][1] ? [...team, 'draws'] : [...team, 'losses'];
      });
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    // if (results.length) {
    modifyTeamCards(results);
    // }
  }, [results]);

  const theWinnerIs = () => (results.map((team, i) => (
    <div key={i + 1}>
      {i === 0 ? (
        <div>
          <h1>
            Team
            {' '}
            {team[0]}
          </h1>
          <h2>
            Final Score:
            {' '}
            {team[1]}
          </h2>
          <br />
          <h3>Maybe next time for:</h3>
        </div>
      ) : (
        <div>
          <h4>
            Team
            {' '}
            {team[0]}
          </h4>
          <h5>
            Final Score:
            {' '}
            {team[1]}
          </h5>
        </div>
      )}
    </div>
  )));

  const itsATie = () => {
    const tied = results.filter((team) => team.includes('draws'));
    const losers = results.filter((team) => team.includes('losses'));

    return (
      <div>
        <h2>Nobody!!!</h2>
        <h2>
          {' '}
          We have a tie between
          {' '}
          {tied.map((t) => t[0]).join(' & ')}
          {' '}
          with a score of
          {' '}
          {tied[0][1]}
        </h2>
        <h3>Better luck next time:</h3>
        {losers.map((team, i) => (
          <div key={i + 1}>
            <h4>
              Team
              {' '}
              {team[0]}
            </h4>
            <h5>
              Final Score:
              {' '}
              {team[1]}
            </h5>
          </div>
        ))}
      </div>

    );
  };

  return (
    <center>
      <h2>And the Winner is... 🥁</h2>
      {results
      && (
      <div>
        {results[0][2] === 'wins' ? theWinnerIs() : itsATie()}
      </div>
      )}
    </center>

  );
};

export default EndGame;
