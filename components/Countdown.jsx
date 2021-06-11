/* eslint-disable linebreak-style */

import React, { useState, useEffect, useContext } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Redirect } from 'react-router-dom';
import { GameContext } from '../context/gameContext';

const Countdown = () => {
  const { state, nextTeam } = useContext(GameContext);
  const { currTeam } = state;
  const [key, setKey] = useState(0);

  const renderTime = ({ remainingTime }) => {
    //deal with this later
    // if (remainingTime <= 10000 && remainingTime > 6000) {
    //   return <div className="timer">Hurry Up</div>;
    // }

    if (remainingTime === 0) {
      nextTeam();
      return <Redirect to="/video" />;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  const renderTimer = () => (
    <CountdownCircleTimer
      key={key}
      isPlaying
      duration={30}
      colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
      onComplete={() => [false, 2000]}
    >
      {renderTime}
    </CountdownCircleTimer>
  );

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [currTeam]);

  return (
    <div className="timer-wrapper">
      { renderTimer() }
    </div>
  );
};

export default Countdown;
