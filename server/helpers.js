/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const dotenv = require('dotenv').config();
const axios = require('axios');
// const bcrypt = require('bcrypt');
const db = require('../db/mysql');

const createSession = (req, res, user) => {
  req.session.regenerate(() => {
    req.session.user = user;
  });
};

// get user req is just the googleId
const getUser = async (id) => {
  const q = 'SELECT * FROM users WHERE googleId=?';
  const user = await db.connection.query(q, id)
  console.log('query result: ', user[0]);
  return user[0][0];
};

const createUser = async (userObj) => {
  const { googleId, givenName: username } = userObj;
  const q = 'INSERT IGNORE INTO users (googleId, username) VALUES (?, ?);';
  const args = [googleId, username];
  try {
    db.connection.query(q, args)
  } catch (err) {
    console.log(err);
  }
};

const getSongs = () => {
  const options = {
    params: {
      part: 'snippet',
      chart: 'mostPopular',
      type: 'video',
      key: process.env.YOUTUBE_API_KEY,
      channelId: 'UCXosPWESPuLZoG66YuHKX9Q',
      maxResults: 50,
    },
  };
  axios.get('https://www.googleapis.com/youtube/v3/search', options)
    .then((data) => {
      console.log('getSongs data: ', data.data.items)
      data.data.items.forEach((song) => {
        db.save(song);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getSongs,
  createSession,
  getUser,
  createUser,
};
