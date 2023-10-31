const Scene = require("telegraf/scenes/base");
const { checkverified } = require("../../services/airtable.services");
const threadMaker = require("../../utils/threadMaker");
const rwClient = require("../../utils/twitterClient");

const menfessCheck = new Scene("MenfessCheck");

menfessCheck.enter(async (ctx) => {
  ctx.reply(`Apakah kamu yakin mengirim menfess ini?`, {
    reply_markup: {
      inline_keyboard: [
        /* One button */
        [
          { text: "Yakin ✅", callback_data: "send" },
          { text: "Gajadi deh❌", callback_data: "cancel" },
        ],
      ],
    },
  });
});

menfessCheck.action("send", async (ctx) => {
  ctx.editMessageText("Sedang mengirim");

  const menfess = ctx.session.state.menfess;
  if (menfess.length < 265) {
    const response = await rwClient.v2.tweet(menfess);
    ctx.editMessageText(
      `Tweet terkirim \n\nLink Tweet : https://twitter.com/CjrFess/status/${response.data.id}`
    );
  } else {
    let thread = threadMaker(menfess);
    const response = await rwClient.v2.tweetThread(thread);
    // console.log(response);
    ctx.editMessageText(
      `Tweet terkirim \n\nLink Tweet : https://twitter.com/CjrFess/status/${response[0].data.id}`
    );
  }
});

module.exports = {
  menfessCheck,
};
