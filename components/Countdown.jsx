/* eslint-disable linebreak-style */
/* eslint-disable no-unused-expressions */

import React, { useState, useEffect, useContext } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

import { GameContext } from '../context/gameContext';

const Countdown = () => {
  const { state, nextTeam } = useContext(GameContext);
  const { currTeam, timer } = state;
  const [key, setKey] = useState(0);

  const timeoutAlert = () => {
    Swal.fire({
      imageUrl: '/goat-sing-resize.jpg',
      title: '🎵🎶 Times Run Out, Get Ready To Sing! 🎶🎵',
      padding: '3em',
      width: 400
    });
 };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      nextTeam;
      timeoutAlert();
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
      duration={timer}
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
