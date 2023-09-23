const Scene = require("telegraf/scenes/base");
const { TwitterBot } = require("../../command/twitterBot");
const TwitterScene = new Scene("TwitterBot");

TwitterScene.enter((ctx) => {
  ctx.editMessageText("Klik tombol dibawah untuk memulai", {
    reply_markup: {
      inline_keyboard: [
        /* One button */
        [
          { text: "Mulai", callback_data: "mulai" },
        ],
      ],
    },
  });
});
TwitterScene.action("mulai", async(ctx) => {
  await TwitterBot(ctx)
});
TwitterScene.action("register/yes", (ctx) => {
  ctx.scene.enter("twitter/registerScene");
});
TwitterScene.action("register/no", (ctx) => {
  ctx.scene.enter("welcome");
});

module.exports = { TwitterScene };
