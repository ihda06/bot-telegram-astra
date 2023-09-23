const Scene = require("telegraf/scenes/base");
const rwClient = require("../../utils/twitterClient");
const SendScene = new Scene("SendScene");

SendScene.enter((ctx) => {
  ctx.reply("Silahkan ketik menfess yang akan dikirim....", {
    reply_markup: {
      inline_keyboard: [
        /* One button */
        [{ text: "Ga Jadi ❌❌", callback_data: "cancel" }],
      ],
    },
  });
});

SendScene.action("cancel", ctx=>ctx.scene.enter("welcome"))

SendScene.on("message", async (ctx) => {
  try {
    await ctx.reply("Mengirim tweet ...");
    const response = await rwClient.v2.tweet(ctx.message.text);
    await ctx.reply(
      `Tweet terkirim \n\nLink Tweet : https://twitter.com/CjrFess/status/${response.data.id}`
    );
    await ctx.scene.enter('welcome')
  } catch (error) {
    console.log(error);
    ctx.reply("error");
  }
});

module.exports = { SendScene };
