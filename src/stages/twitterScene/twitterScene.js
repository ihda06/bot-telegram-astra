const Scene = require("telegraf/scenes/base");
const Airtables = require("../../utils/Airtable");
const TwitterScene = new Scene("TwitterBot");

TwitterScene.action("register/yes", (ctx) => {
  ctx.scene.enter("twitter/registerScene");
});
TwitterScene.action("register/no", (ctx) => {
  ctx.scene.enter("welcome");
});

module.exports = { TwitterScene };
