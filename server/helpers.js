/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const dotenv = require("dotenv").config();
const axios = require("axios");
// const bcrypt = require('bcrypt');
const { decode } = require("he");
const db = require("../db/mysql");

require("dotenv").config();

const createSession = (req, res, user) => {
  req.session.regenerate(() => {
    req.session.user = user;
  });
};

// get user req is just the googleId
const getUser = async (id) => {
  const q = "SELECT * FROM users WHERE googleId=?;";
  const user = await db.connection.query(q, id);
  return user[0][0];
};

const createUser = async (userObj) => {
  const { googleId, givenName: username } = userObj;
  const q = "INSERT IGNORE INTO users (googleId, username) VALUES (?, ?);";
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
      part: "snippet",
      chart: "mostPopular",
      type: "video",
      key: process.env.YOUTUBE_API_KEY,
      channelId: "UCXosPWESPuLZoG66YuHKX9Q",
      maxResults: 50,
    },
  };
  axios
    .get("https://www.googleapis.com/youtube/v3/search", options)
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

//* Team table helpers

const setTeams = async ({ googleId, teams }) => {
  const check = "SELECT * FROM teams WHERE teamName=? AND userId=?";
  const add = "INSERT INTO teams(teamName,userId) VALUES(?, ?)";

  const returnTeams = await Promise.all(
    teams.map(async (team) => {
      let args = [team, googleId];
      let checkTeam = await db.connection.query(check, args);
      console.log('check team', checkTeam[0]);
      if (!checkTeam[0].length) {
        await db.connection.query(add, args);
        checkTeam = await db.connection.query(check, args);
      }
      
      console.log('added to db: ', checkTeam[0])
      return checkTeam[0];
    })
  );
  return returnTeams;
};

const getTeams = async (id) => {
  const q = "SELECT * FROM teams WHERE userId=?";
  try {
    const teams = await db.connection.query(q, id);
    console.log('All the teams: ', teams[0])
    return teams[0];
  } catch (err) {
    console.log(err);
  }
};

const addTeam = async ({ teamName, googleId }) => {
  console.log(team);
  const q = "INSERT INTO teams(teamName,userId) VALUES(?, ?)";
  const args = [teamName, googleId];
  try {
    const newTeam = await db.connection.query(q, args);
    return newTeam;
  } catch (err) {
    console.log("error in helpers: ", err);
  }
};

const escapeQuotes = (string) => string.split("/").join(",");
const escapeHTML = (trivia) => {
  const decodedQuestion = {
    category: trivia.category,
    type: trivia.type,
    question: escapeQuotes(decode(trivia.question)),
    correct_answer: decode(trivia.correct_answer),
    incorrect_answers:
      trivia.incorrect_answers.length === 1
        ? [decode(trivia.incorrect_answers[0])]
        : [
            decode(trivia.incorrect_answers[0]),
            decode(trivia.incorrect_answers[1]),
            decode(trivia.incorrect_answers[2]),
          ],
  };
  return decodedQuestion;
};
module.exports = {
  getSongs,
  createSession,
  escapeHTML,
  getUser,
  createUser,
  getTeams,
  addTeam,
  setTeams,
};
