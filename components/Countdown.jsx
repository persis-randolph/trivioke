/* eslint-disable linebreak-style */

import React, { useState, useEffect, useContext } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

import { GameContext } from '../context/gameContext';

const Countdown = () => {
  const { state, nextTeam } = useContext(GameContext);
  const { currTeam } = state;
  const [key, setKey] = useState(0);

  const timeoutAlert = () => {
    Swal.fire(`You Have Run Out Of Time\n Time To Sing!`);
    // .then(() => {
    //    nextTeam();
    // return <Redirect to="/video" />;
    // });
  };

  const renderTime = ({ remainingTime }) => {
    // deal with this later
    // if (remainingTime <= 10000 && remainingTime > 6000) {
    //   return <div className="timer">Hurry Up</div>;
    // }

    if (remainingTime === 0) {
      timeoutAlert();
      nextTeam();
      return <Redirect to="/video" />;
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
        <div className="text">Remaining</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  const renderTimer = () => (
    <CountdownCircleTimer
      size={140}
      key={key}
      isPlaying
      duration={15}
      colors={[['#210004', 0.33], ['#A30000', 0.33], ['#c90018']]}
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
