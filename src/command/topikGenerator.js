const session = require("telegraf/session");
const { stage } = require("../stages");

const TopikGenerator = (bot) => {
  bot.use(session());
  bot.use(stage.middleware());
  bot.command("TopikGenerator", (ctx) => {
    ctx.scene.enter("SceneTopik");
  });
};

module.exports = { TopikGenerator };
