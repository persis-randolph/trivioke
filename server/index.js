/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const key = require('../config.js');
const db = require('../db/mysql.js');

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

const getSongs = () => {
  const options = {
    params: {
      part: 'snippet',
      chart: 'mostPopular',
      type: 'video',
      key: key.youtube,
      channelId: 'UCXosPWESPuLZoG66YuHKX9Q',
      maxResults: 50,
    },
  };
  axios.get('https://www.googleapis.com/youtube/v3/search', options)
    .then((data) => {
      data.data.items.forEach((song) => {
        db.save(song);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

app.post('/songs', (req, res) => {
  getSongs(req, res);
  res.sendStatus(200);
});

const createSession = (req, res, user) => {
  req.session.regenerate(() => {
    req.session.user = user;
  });
};

app.post('/signup', (req, res) => {
  bcrypt.hash(req.query.pw, saltRounds, (err, hash) => {
    if (err || !hash) {
      res.sendStatus(500).send('signuperror');
      console.log(err);
    } else {
      const q = 'insert into users(username, pw) values(?, ?)';
      const args = [req.query.name, hash];
      db.connection.query(q, args, (error, results) => {
        if (error) {
          res.send(500);
        } else {
          createSession(req, res, req.query.name);
          console.log(req.session);
          res.end();
          console.log('user added to db');
        }
      });
    }
  });
});


const checkPassword = (req, res) => {
  const q = 'select * from users where username=?';
  const args = [req.query.name];
  db.connection.query(q, args, (err, results) => {
    if (err || !results) {
      res.send(err);
    } else {
      bcrypt.compare(req.query.pw, results[0].pw, (error, result) => {
        if (result === true) {
          console.log('passwords match');
          createSession(req, res, req.query.name);
          res.send(200);
        } else {
          console.log('passwords don\'t match');
          res.send(404);
          res.end();
        }
      });
    }
  });
};

app.get('/login', (req, res) => {
  checkPassword(req, res);
});

const port = 8080;
app.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${process.env.PORT || port}`);
});
