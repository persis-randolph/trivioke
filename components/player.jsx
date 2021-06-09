/* eslint-disable no-console */
/* eslint-disable no-shadow */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Iframe from 'react-iframe';
import { Link } from 'react-router-dom';

const VideoPlayer = () => {
  const [video, setVideo] = useState({ song: 'Frankie Valli - Can\'t Take My Eyes Off Of You Karaoke Lyrics', uri: 'UXYjQa_osMI' });
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('/songs')
      .then(({ data }) => {
        if (data.length) {
          console.log('PATH: there is existing data in the db');
          const rand = Math.floor(Math.random() * (videos.length - 1)) + 1;
          setVideo(data[rand]);
          setVideos(data);
        } else {
          console.log('PATH: there is nothing in the db');
          axios.post('/songs')
            .then(() => {
              axios.get('/songs')
                .then(({ data }) => {
                  const rand = Math.floor(Math.random() * (videos.length - 1)) + 1;
                  setVideo(data[rand]);
                  setVideos(data);
                });
            });
        }
      });
  }, []);

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
        <button
          type="button"
          style={{
            justifyContent: 'center', alignItems: 'center', height: '3vh',
          }}
          // onClick={this.goBack}
        >
          <Link to="/game">Back</Link>
        </button>
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
