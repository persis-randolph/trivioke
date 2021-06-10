/* eslint-disable linebreak-style */

import React, { useState, useEffect, useContext } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { GameContext } from '../context/gameContext';

const Countdown = () => {
  // const rerender = () => useState()[1];
  const { state } = useContext(GameContext);
  const { currTeam } = state;
  const [key, setKey] = useState(0);

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too late...</div>;
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

// link to player page if answer is wrong//

export default Countdown;
