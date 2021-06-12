const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  apps: [{
    name: 'trivioke',
    script: './src/index.js',
    env: {
      NODE_ENV: 'development',
      YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    },
    env_production: {
      NODE_ENV: 'development',
      YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    },
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-223-184-101.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/trioke-key.pem',
      ref: 'origin/master',
      repo: 'git@github.com:BiscuitBae/trivioke.git',
      path: '/home/ubuntu/trivioke',
      'post-deploy': 'npm run-script restart',
      env: {
        NODE_ENV: 'development',
        YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
      },
      env_production: {
        NODE_ENV: 'development',
        YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
      },
    },
  },
};
