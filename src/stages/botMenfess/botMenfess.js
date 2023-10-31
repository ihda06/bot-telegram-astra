const Stage = require("telegraf/stage");
const { input } = require("./input");
const { menfessCheck } = require("./menfessCheck");

const botMenfessStage = new Stage();

botMenfessStage.register(input, menfessCheck);

module.exports = {
  botMenfessStage,
};
