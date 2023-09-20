const Stage = require("telegraf/stage");

const { welcome } = require("./welcome");
const { ResultTopik } = require("./TopikGeneratorScene/resultTopik");
const { tambahTopik } = require("./TopikGeneratorScene/tambahTopik");
const { PostUse } = require("./postUse");

// Create scene manager
const stage = new Stage();

// Scene registration
stage.register(welcome, ResultTopik, tambahTopik, PostUse);

module.exports = {
  stage,
};
