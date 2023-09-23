const Stage = require("telegraf/stage");

const { welcome } = require("./welcome");
const { ResultTopik } = require("./TopikGeneratorScene/resultTopik");
const { tambahTopik } = require("./TopikGeneratorScene/tambahTopik");
const { PostUse } = require("./postUse");
const { TwitterScene } = require("./twitterScene/twitterScene");
const TwitterRegisterScene = require("./twitterScene/registerScene");
const { SendScene } = require("./twitterScene/sendScene");

// Create scene manager
const stage = new Stage();

// Scene registration
stage.register(
  welcome,
  ResultTopik,
  tambahTopik,
  PostUse,
  TwitterScene,
  TwitterRegisterScene,
  SendScene
);

module.exports = {
  stage,
};
