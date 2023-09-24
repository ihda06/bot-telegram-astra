const Scene = require("telegraf/scenes/base");
const { greeting } = require("../commons/constants/commonReplies");
const { TopikGenerator } = require("../command/topikGenerator");
const { TwitterBot } = require("../command/twitterBot");

const welcome = new Scene("welcome");

welcome.command("cancel", (ctx) => {
  ctx.scene.leave();
  ctx.reply("leaving");
});

welcome.action("TopikGenerator", async (ctx) => {
  await TopikGenerator(ctx);
  ctx.scene.enter("ResultTopik");
});
welcome.command("topikgenerator", async (ctx) => {
  await TopikGenerator(ctx);
  ctx.scene.enter("ResultTopik");
});
welcome.command("twitterbot", async (ctx) => {
  ctx.reply("coming soon");
  ctx.scene.enter("welcome");
});
welcome.action("twitterBot", async (ctx) => {
  await TwitterBot(ctx);
});
welcome.action("register/yes", (ctx) => {
  ctx.scene.enter("twitter/registerScene");
});
welcome.action("register/no", (ctx) => {
  ctx.scene.enter("welcome");
});

welcome.enter((ctx) => {
  ctx.reply(greeting(ctx.session.state.userInfo.first_name), {
    reply_markup: {
      inline_keyboard: [
        /* One button */
        [{ text: "💭💭 Topik Generator", callback_data: "TopikGenerator" }],
        [{ text: "🐦🐦 Bot Twitter", callback_data: "twitterBot" }],
      ],
    },
  });
});

module.exports = {
  welcome,
};
