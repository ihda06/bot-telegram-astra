const Scene = require("telegraf/scenes/base");
const { greeting } = require("../commons/constants/commonReplies");

const welcome = new Scene("welcome");
welcome.enter((ctx) => {
  ctx.reply(greeting(ctx.message.from.first_name));
});
welcome.command("TopikGenerator", (ctx) => {
  ctx.scene.enter("ResultTopik");
});

module.exports = {
  welcome,
};
