/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const dotenv = require('dotenv').config();
const axios = require('axios');
// const bcrypt = require('bcrypt');
const { decode } = require('he');
const db = require('../db/mysql');

require('dotenv').config();

const createSession = (req, res, user) => {
  req.session.regenerate(() => {
    req.session.user = user;
  });
};

// get user req is just the googleId
const getUser = async (id) => {
  const q = 'SELECT * FROM users WHERE googleId=?;';
  const user = await db.connection.query(q, id);
  return user[0][0];
};

const createUser = async (userObj) => {
  const { googleId, givenName: username } = userObj;
  const q = 'INSERT IGNORE INTO users (googleId, username) VALUES (?, ?);';
  const args = [googleId, username];
  try {
    await db.connection.query(q, args);
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
      // console.log('getSongs data: ', data.data.items);
      data.data.items.forEach((song) => {
        db.save(song);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const escapeQuotes = (string) => string.split('/').join(',');
const escapeHTML = (trivia) => {
  const decodedQuestion = {
    category: trivia.category,
    type: trivia.type,
    question: escapeQuotes(decode(trivia.question)),
    correct_answer: decode(trivia.correct_answer),
    incorrect_answers: trivia.incorrect_answers.length === 1
      ? [decode(trivia.incorrect_answers[0])]
      : [decode(trivia.incorrect_answers[0]),
        decode(trivia.incorrect_answers[1]),
        decode(trivia.incorrect_answers[2])],
  };
  return decodedQuestion;
};

// takes in an array of category objects containing keys id and name.
const parseCategories = (catArr) => catArr.reduce((acc, cat) => {
  // Cleans up category name by getting rid of redundant names ex: Science: Science & Mathematics
  if (cat.name.includes(':')) {
    const i = cat.name.indexOf(':');
    cat.name = cat.name.slice(i + 2);
  }
  acc[cat.id] = cat.name;
  return acc;
}, {});
module.exports = {
  getSongs,
  createSession,
  escapeHTML,
  getUser,
  createUser,
  parseCategories,
};
