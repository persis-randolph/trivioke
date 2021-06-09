/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
// const cors = require('cors');
const session = require('express-session');
const axios = require('axios');
const db = require('../db/mysql');
const {
  getSongs,
  escapeHTML,
  getUser,
  createUser,
} = require('./helpers');

const saltRounds = 10;
const app = express();
// app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../images')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true,
}));

app.get('/trivia/multi', (req, res) => {
  axios.get(`https://opentdb.com/api.php?amount=1&category=${req.query.categoryID}&difficulty=${req.query.diff}&type=multiple`)
    .then(({ data }) => {
      const question = escapeHTML(data.results[0]);
      res.status(200).send(question);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

app.get('/trivia/bool', (req, res) => {
  axios.get(`https://opentdb.com/api.php?amount=1&category=${req.query.categoryID}&difficulty=${req.query.diff}&type=boolean`)
    .then(({ data }) => {
      const question = escapeHTML(data.results[0]);
      res.status(200).send(question);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

app.get('/songs', async (req, res) => {
  try {
    const songs = await db.connection.query('SELECT * FROM songs;');
    res.status(200).send(songs[0]);
  } catch (err) {
    console.log(err);
  }
});

app.post('/songs', async (req, res) => {
  try {
    await getSongs(req, res);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/users', async (req, res) => {
  const { googleId, username } = req.query;

  const existingUser = await getUser(googleId);

  console.log('existing user ==>', existingUser);
  if (existingUser) {
    res.status(201).send(existingUser);
  } else if (!existingUser) {
    createUser(req.query);
    const newUser = await getUser(googleId);
    console.log('new user ==>', newUser);
    res.status(200).send(newUser);
  } else {
    console.log('user not found');
    res.sendStatus(404);
  }
});

const port = 8080;
app.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${process.env.PORT || port}`);
});
