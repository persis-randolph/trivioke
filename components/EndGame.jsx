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
  const [results, setResults] = useState([]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (results.length) {
      modifyTeamCards(results);
    }
  }, [results]);

  // [[biscuits, 1], [rutabagas, 2]];

  const theWinnerIs = results.map((team, i) => (
    <div key={team + i}>
      {i === 0 ? (
        <div>
          <h2>And the Winner is... 🥁</h2>
          <br />
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
  ));

  const itsATie = (
    <div>
      <h2>And the Winner is... 🥁</h2>
      <br />
      <h2>Nobody!!!</h2>
      {results.map((team, i) => (
        <div key={team + 1}>
          {team[2] === 'draws' ? (
            <div>
              {/* this isn't gonna work with map, gotta find another way */}
            </div>
          )}
        </div>

      ))}
    </div>
  );

  return (
    <center>
      {theWinnerIs}
    </center>
  );
};

export default EndGame;
