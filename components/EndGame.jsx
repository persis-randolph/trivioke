/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { GameContext } from '../context/gameContext';

const EndGame = () => {
  const { state } = useContext(GameContext);
  const { count, teams } = state;

  const loadTeamScores = () => {
    // console.log(sessionStorage); // => looks like this:
    // category: "9"
    // diff: "easy"
    // length: 6
    // score1: "0"
    // score2: "1"
    // team1: "biscuits"
    // team2: "rutabagas"

    const teamScoreMap = teams.reduce((acc, team, i) => {
      acc.push([team, sessionStorage[`score${i + 1}`]]);
      return acc;
    }, []);

    console.log(teamScoreMap);

    // [[biscuits, 1], [rutabagas, 2]];

    teamScoreMap.sort((a, b) => {
      if (a[1] < b[1]) return 1;
      if (a[1] > b[1]) return -1;
      return 0;
    });

    // const highToLowScore = teams.reduce((highToLow, teamName, i) => {
    //   let index = 0;
    //   while (index < highToLow.length && sessionStorage[`score${i + 1}`] > highToLow[index]) {
    //     console.log('index: ', index, 'highToLow: ', highToLow, 'sessionStorage[`score${i + 1}`]:', sessionStorage[`score${i + 1}`], 'highToLow[index]: ', highToLow[index]);
    //     index++;
    //   }
    //   highToLow.splice(index, 0, [teamName, sessionStorage[`score${i + 1}`]]);
    //   return highToLow;
    // }, []);

    return (
      teamScoreMap.map((team, i) => (
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
      ))
    );
  };

  return (
    <center>
      {loadTeamScores()}
    </center>
  );
};

export default EndGame;
