const Scene = require("telegraf/scenes/base");
const rwClient = require("../../utils/twitterClient");
const SendScene = new Scene("SendScene");

SendScene.action("cancel", (ctx) => {
  console.log("clicked");
  ctx.reply("masuk");
});

SendScene.command("tes", (ctx) => {
  ctx.reply("masuk");
});

SendScene.on("message", async (ctx) => {
  try {
    await ctx.reply("Mengirim tweet ...");
    const response = await rwClient.v2.tweet(ctx.message.text);
    await ctx.reply(
      `Tweet terkirim \n\nLink Tweet : https://twitter.com/CjrFess/status/${response.data.id}`
    );
    ctx.scene.enter("welcome");
  } catch (error) {
    console.log(error);
    ctx.reply("error");
  }
});

SendScene.enter((ctx) => {
  console.log("send scene", ctx.scene);

  ctx.reply("Silahkan ketik menfess yang akan dikirim....", {
    reply_markup: {
      inline_keyboard: [
        /* One button */
        [{ text: "Ga Jadi ❌❌", callback_data: "cancel" }],
      ],
    },
  });
});

module.exports = { SendScene };
