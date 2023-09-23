const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

// require('dotenv').config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
  // clientId: process.env.TWITTER_CLIENT_ID,
  // clientSecret: process.env.TWITTER_CLIENT_SECRET,
});

const rwClient = client.readWrite;

module.exports = rwClient;
