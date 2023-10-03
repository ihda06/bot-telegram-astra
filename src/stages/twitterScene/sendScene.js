const Scene = require("telegraf/scenes/base");
const rwClient = require("../../utils/twitterClient");
const threadMaker = require("../../utils/threadMaker");
const { sendTweet } = require("../../services/twitter.services");
const SendScene = new Scene("SendScene");

SendScene.action("cancel", (ctx) => {
  ctx.scene.enter("welcome");
});

SendScene.command("tes", (ctx) => {
  ctx.scene.enter("welcome");
});

SendScene.on("message", async (ctx, next) => {
  try {
    if (!ctx.message.photo) {
      const menfess = ctx.message.text;
      if (menfess.search(/Cjr!/) >= 0) {
        if(menfess.length < 265){
          const response = await rwClient.v2.tweet(ctx.message.text);
          ctx.reply(
            `Tweet terkirim \n\nLink Tweet : https://twitter.com/CjrFess/status/${response.data.id}`,
            {
              reply_markup: {
                inline_keyboard: [
                  /* One button */
                  [
                    { text: "Kirim menfess lagi✅", callback_data: "restart" },
                    { text: "Back to menu❌", callback_data: "menu" },
                  ],
                ],
              },
            }
          );
        } else{
          let thread = threadMaker(menfess)
          const response = await rwClient.v2.tweetThread(thread);
          // console.log(response);
          ctx.reply(
            `Tweet terkirim \n\nLink Tweet : https://twitter.com/CjrFess/status/${response[0].data.id}`,
            {
              reply_markup: {
                inline_keyboard: [
                  /* One button */
                  [
                    { text: "Kirim menfess lagi✅", callback_data: "restart" },
                    { text: "Back to menu❌", callback_data: "menu" },
                  ],
                ],
              },
            }
          );
        }
      } 
      else {
        ctx.reply(`Gunakan trigger menfes ya! \n \n"Cjr!"`);
      }
    } else {
      ctx.reply("Menfess belum bisa mengirim foto, kirim ulang menfess tanpa foto")
      // const menfess = ctx.caption;
      // sendTweet(ctx, menfess)
    }
  } catch (error) {
    console.log(error);
    ctx.reply("error");
  }
});

SendScene.action("restart", (ctx) => {
  ctx.scene.reenter();
});

SendScene.action("menu", (ctx) => {
  ctx.scene.enter("welcome");
});

SendScene.enter((ctx) => {
  // console.log("send scene", ctx.scene);

  ctx.reply(`Silahkan ketik menfess dengan trigger "Cjr!" .....`, {
    reply_markup: {
      inline_keyboard: [
        /* One button */
        [{ text: "Ga Jadi ❌❌", callback_data: "cancel" }],
      ],
    },
  });
});

module.exports = { SendScene };
