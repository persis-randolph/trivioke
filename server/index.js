/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
// const cors = require('cors');
const session = require('express-session');
const db = require('../db/mysql');
const util = require('./helpers');

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

app.get('/songs', async (req, res) => {
  try {
    const songs = await db.connection.query('SELECT * FROM songs;');
    // console.log(songs[0]);
    res.status(200).send(songs[0]);
  } catch (err) {
    console.log(err);
  }
});

app.post('/songs', async (req, res) => {
  try {
    await util.getSongs(req, res);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/users', async (req, res) => {
  const { googleId, username } = req.query;

  const existingUser = await util.getUser(googleId);

  console.log('existing user ==>', existingUser);
  if (existingUser) {
    res.status(201).send(existingUser);
  } else if (!existingUser) {
    util.createUser(req.query);
    const newUser = await util.getUser(googleId);
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
