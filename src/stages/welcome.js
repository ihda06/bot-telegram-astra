const Scene = require("telegraf/scenes/base");
const { greeting } = require("../commons/constants/commonReplies");
const { TopikGenerator } = require("../command/topikGenerator");

const welcome = new Scene("welcome");
welcome.enter((ctx) => {
  ctx.reply(greeting(ctx.session.state.userInfo.first_name), {
    reply_markup: {
      inline_keyboard: [
        /* One button */
        [{ text: "💭💭 Topik Generator", callback_data: "TopikGenerator" }],
      ],
    },
  });
});

welcome.command("cancel", (ctx) => {
  ctx.scene.leave();
  ctx.reply("leaving");
});


welcome.action("TopikGenerator", async (ctx) => {
  await TopikGenerator(ctx)
  ctx.scene.enter("ResultTopik");
});


module.exports = {
  welcome,
};
