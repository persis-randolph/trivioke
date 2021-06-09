/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const db = require('../db/mysql');
const util = require('./helpers');

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
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.post('/songs', (req, res) => {
  util.getSongs(req, res);
  res.sendStatus(200);
});

app.post('/signup', (req, res) => {
  util.createPassword(req, res, saltRounds);
});

app.get('/login', (req, res) => {
  util.checkPassword(req, res);
});

app.get('/users', async (req, res) => {
  // const { googleId, username } = req.query.userData;

  console.log(req.query)

  const q = 'insert ignore into users(username) values(?)';
  // this will need to be a call to get the user from the db
  // const existingUser = await getUser(googleId);

  // if (existingUser.length) {
  //   res.status(201).send(existingUser[0]);
  // } else if (!existingUser.length) {
  //   createUser(req.query)
  //     .then((user) => {
  //       res.status(200)
  //         .send(user);
  //     })
  //     .catch((err) => {
  //       // console.log('error creating user', err);
  //       res.sendStatus(500);
  //     });
  // } else {
  //   console.log('user not found');
  //   res.sendStatus(404);
  // }
});

const port = 8080;
app.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${process.env.PORT || port}`);
});
