/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import Iframe from 'react-iframe';
import { Link } from 'react-router-dom';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      video: {
        song: 'Dolly Parton - Jolene Karaoke Lyrics',
        uri: '8ff0szPBM2M',
      },
    };
    this.changeVideo = this.changeVideo.bind(this);
  }

  componentDidMount() {
    const { videos } = this.state;
    const rand = Math.floor(Math.random() * (videos.length - 1)) + 1;
    axios({ method: 'GET', url: '/songs', headers: { 'Access-Control-Allow-Origin': '*' } })
      .then((res) => {
        this.setState({
          video: res.data[rand],
          videos: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeVideo() {
    const { videos } = this.state;
    const rand = Math.floor(Math.random() * (videos.length - 1)) + 1;
    this.setState({
      video: videos[rand],
    });
  }

  render() {
    const { video } = this.state;
    return (
      <center>
        <div>
          <button
            onClick={this.changeVideo}
            type="button"
            style={{
              justifyContent: 'center', alignItems: 'center', height: '3vh',
            }}
          >
            Change Song
          </button>
          <button
            type="button"
            onClick={this.goBack}
            style={{
              justifyContent: 'center', alignItems: 'center', height: '3vh',
            }}
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
  }
}
export default VideoPlayer;
