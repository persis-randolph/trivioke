/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// const mysql = require('mysql2');
const mysql = require('mysql2/promise');
require('dotenv').config();

// const { DB_PASS, DB_USERNAME } = require('../prod-config');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'trivioke',
});

// const connection = mysql.createPool({
//   host: 'localhost',
//   user: process.env.DB_USERNAME || DB_USERNAME,
//   password: process.env.DB_PASS || DB_PASS,
//   database: 'trivioke',
// });

// this should only happen once;
const save = async (data) => {
  const q = 'INSERT IGNORE songs (song, uri) VALUES (?, ?);';
  const args = [data.snippet.title, data.id.videoId];
  try {
    await connection.query(q, args);
  } catch (err) {
    console.log('save error', err);
  }
};

module.exports.save = save;
module.exports.connection = connection;
