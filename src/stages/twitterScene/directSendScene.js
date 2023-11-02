const Scene = require("telegraf/scenes/base");
const rwClient = require("../../utils/twitterClient");
const threadMaker = require("../../utils/threadMaker");
const DirectSendScene = new Scene("DirectSendScene");

DirectSendScene.enter((ctx) => {
  ctx.reply(`Apakah kamu yakin mengirim menfess ini?`, {
    reply_markup: {
      inline_keyboard: [
        /* One button */
        [
          { text: "Yakin ✅✅", callback_data: "yes" },
          { text: "Ga Jadi ❌❌", callback_data: "cancel" },
        ],
      ],
    },
  });
});

DirectSendScene.action("cancel", (ctx) => {
  ctx.editMessageText("Okay!");
  ctx.scene.leave();
});
DirectSendScene.action("yes", async (ctx) => {
  await ctx.editMessageText("Mengirim tweet ⌛");
  const menfess = ctx.session.state.menfess;
  if (menfess.length < 265) {
    const response = await rwClient.v2.tweet(menfess);
    await ctx.editMessageText(
      `Tweet terkirim \n\nLink Tweet : https://twitter.com/CjrFess/status/${response.data.id}`
    );
  } else {
    let thread = threadMaker(menfess);
    const response = await rwClient.v2.tweetThread(thread);
    // console.log(response);
    await ctx.editMessageText(
      `Tweet terkirim \n\nLink Tweet : https://twitter.com/CjrFess/status/${response[0].data.id}`
    );
  }
});

module.exports = { DirectSendScene };
