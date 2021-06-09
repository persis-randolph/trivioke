/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const axios = require('axios');
const db = require('../db/mysql');
const {
  getSongs,
  checkPassword,
  createPassword,
  escapeHTML,
} = require('./helpers');

const saltRounds = 10;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../images')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true,
}));

app.get('/songs', (req, res) => {
  db.connection.query('select * from songs', (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results);
    }
  });
});

app.post('/songs', (req, res) => {
  getSongs(req, res);
  res.sendStatus(200);
});

app.post('/signup', (req, res) => {
  createPassword(req, res, saltRounds);
});

app.get('/login', (req, res) => {
  checkPassword(req, res);
});

app.get('/trivia/multi', (req, res) => {
  axios.get(`https://opentdb.com/api.php?amount=1&category=${req.query.categoryID}&difficulty=${req.query.diff}&type=multiple&token=de2a56bef025d1dfb49914b3fc45f656a8679f01c56bbc04837d3aa34eb1ae3c`)
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
  axios.get(`https://opentdb.com/api.php?amount=1&category=${req.query.categoryID}&difficulty=${req.query.diff}&type=boolean&token=de2a56bef025d1dfb49914b3fc45f656a8679f01c56bbc04837d3aa34eb1ae3c`)
    .then(({ data }) => {
      const question = escapeHTML(data.results[0]);
      res.status(200).send(question);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

const port = 8080;
app.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${process.env.PORT || port}`);
});
