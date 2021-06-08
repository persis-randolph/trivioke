/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Iframe from 'react-iframe';
import { Link } from 'react-router-dom';

const VideoPlayer = () => {
  const [video, setVideo] = useState({ song: 'Frankie Valli - Can&#39;t Take My Eyes Off Of You Karaoke Lyrics', uri: 'UXYjQa_osMI' });
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('/songs')
      .then(({ data }) => {
        if (data.length) {
          const rand = Math.floor(Math.random() * (videos.length - 1)) + 1;
          console.log('DATA!', data);
          setVideo(data[rand]);
          setVideos(data);
        } else {
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
          // onClick={goBack}
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
};

// class VideoPlayerzzzz extends React.Component {
// constructor(props) {
//   super(props);
//   this.state = {
//     videos: [],
//     video: null,
//   };
//   this.changeVideo = this.changeVideo.bind(this);
// }

// componentDidMount() {
//   // make a get request to see if there are videos in the db or not
//   axios({ method: 'GET', url: '/songs', headers: { 'Access-Control-Allow-Origin': '*' } })
//     .then(({ data }) => {
//       // if there are videos, set state
//       if (data.length) {
//         // console.log('DATA!', data);
//         // const rand = Math.floor(Math.random() * (data.length - 1)) + 1;
//         // this.setState({
//         //   video: data[rand],
//         //   videos: data,
//         // });
//       } else {
//         // if no videos, make a post request to add them
//         axios({ method: 'POST', url: '/songs', headers: { 'Access-Control-Allow-Origin': '*' } })
//           .then(axios({ method: 'GET', url: '/songs', headers: { 'Access-Control-Allow-Origin': '*' } })
//             .then(({ data }) => {
//               const rand = Math.floor(Math.random() * (data.length - 1)) + 1;
//               // then set state
//               this.setState({
//                 video: data[rand],
//                 videos: data,
//               });
//             }));
//       }
//     });
// }

//   changeVideo() {
//     const { videos } = this.state;
//     const rand = Math.floor(Math.random() * (videos.length - 1)) + 1;
//     this.setState({
//       video: videos[rand],
//     });
//   }

//   render() {
//     const { video } = this.state;
//     return (
//       <center>
//         <div>
//           <button
//             onClick={this.changeVideo}
//             type="button"
//             style={{
//               justifyContent: 'center', alignItems: 'center', height: '3vh',
//             }}
//           >
//             Change Song
//           </button>
//           <button
//             type="button"
//             onClick={this.goBack}
//             style={{
//               justifyContent: 'center', alignItems: 'center', height: '3vh',
//             }}
//           >
//             <Link to="/game">Back</Link>
//           </button>
//           <Iframe
//             fluid="true"
//             className="embed-responsive-item"
//             url={`https://www.youtube.com/embed/${video.uri}`}
//             position="relative"
//             width="500px"
//             height="350px"
//             allowFullScreen
//           />
//         </div>
//       </center>
//     );
//   }
// }

export default VideoPlayer;
