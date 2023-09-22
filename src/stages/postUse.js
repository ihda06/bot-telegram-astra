const Scene = require("telegraf/scenes/base");
const { postUse } = require("../commons/constants/commonReplies");

const PostUse = new Scene("postUse");
PostUse.enter((ctx) => {
  ctx.reply(postUse, {
    reply_markup: {
      inline_keyboard: [
        /* One button */
        [{ text: "💭💭 Topik Generator", callback_data: "TopikGenerator" }],
      ],
    },
  });
});
PostUse.command("TopikGenerator", (ctx) => {
  ctx.scene.enter("ResultTopik");
});
PostUse.action("TopikGenerator", (ctx) => {
  ctx.scene.enter("ResultTopik");
});

module.exports = {
  PostUse,
};
