const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  apps: [{
    name: 'trivioke',
    script: './src/index.jsx',
    env: {
      NODE_ENV: 'development',
      YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
      DB_PASS: process.env.DB_PASS,
    },
    env_production: {
      NODE_ENV: 'development',
      YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
      DB_PASS: process.env.DB_PASS,
    },
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-3-138-183-17.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/trivioke-key.pem',
      ref: 'origin/master',
      repo: 'git@github.com:BiscuitBae/trivioke.git',
      path: '/home/ubuntu/trivioke',
      'post-deploy': 'npm run-script restart',
      env: {
        NODE_ENV: 'development',
        YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
        DB_PASS: process.env.DB_PASS,
      },
      env_production: {
        NODE_ENV: 'development',
        YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
        DB_PASS: process.env.DB_PASS,
      },
    },
  },
};
