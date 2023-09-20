const Scene = require("telegraf/scenes/base");
const { postUse } = require("../commons/constants/commonReplies");

const PostUse = new Scene("postUse");
PostUse.enter((ctx) => {
  ctx.reply(postUse);
});
PostUse.command("TopikGenerator", (ctx) => {
  ctx.scene.enter("ResultTopik");
});

module.exports = {
  PostUse,
};
