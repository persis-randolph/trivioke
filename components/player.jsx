/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-shadow */

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Iframe from 'react-iframe';
import { Link } from 'react-router-dom';
import { GameContext } from '../context/gameContext';
import { UserContext } from '../context/userContext';

const VideoPlayer = () => {
  const { state } = useContext(GameContext);
  const { video, setVideo, videos } = state;

  const changeVideo = () => {
    const rand = Math.floor(Math.random() * (videos.length - 1)) + 1;
    setVideo(videos[rand]);
  };

  return (
    <center>
      <div>
        <button
          onClick={changeVideo}
          type="button"
          style={{
            justifyContent: 'center', alignItems: 'center', height: '3vh',
          }}
        >
          Change Song
        </button>
        <Link to="/game">
          <button
            type="button"
            style={{
              justifyContent: 'center', alignItems: 'center', height: '3vh',
            }}
          >
            Back to Game
          </button>
        </Link>
        <Iframe
          fluid="true"
          className="embed-responsive-item"
          url={`https://www.youtube.com/embed/${video.uri}`}
          position="relative"
          width="500px"
          height="350px"
          allowFullScreen
        />
      </div>
    </center>
  );
};

export default VideoPlayer;
