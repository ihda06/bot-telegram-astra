const { logsRequest } = require("./middleware/logs");
const session = require("telegraf/session");
const { stage } = require("./stages");
const { Telegraf } = require("telegraf");

const express = require("express");
const { checkUserName } = require("./utils/Airtable");
require("dotenv").config();
const expressApp = express();

const bot = new Telegraf(
  process.env.PRODUCTION === "TRUE"
    ? process.env.API_TOKEN
    : process.env.API_TOKEN_DEV
);
bot.telegram.webhookReply = false

bot.use(logsRequest);
bot.use(session());
bot.use(stage.middleware());
// Register middleware
bot.start(async (ctx) => {
  ctx.scene.enter("welcome");
  if (ctx.message) {
    ctx.session.state = { userInfo: ctx.message.from };
  }
});

bot.hears(/Cjr!/, async (ctx) => {
  await ctx.replyWithChatAction("typing");
  ctx.session.state = { userInfo: ctx.message.from, menfess: ctx.message.text };
  console.log(ctx.message.from.username);
  const result = await checkUserName(ctx.message.from.username);
  switch (result) {
    case 0:
      await ctx.scene.enter("twitter/registerScene");
      break;
    case 1:
      await ctx.reply(
        "Akun anda belum di verifikasi admin, tunggu hingga diverifikasi"
      );
      break;
    case 2:
      await ctx.scene.enter("DirectSendScene");
      break;
  }
  // await ctx.reply(result);
});

bot.on("photo", async (ctx) => {
  const caption = ctx.message.caption;
  if (caption) {
    if (caption.search(/Cjr!/) >= 0) {
      ctx.reply(
        "Kirim foto melalui https://astra-webapp.vercel.app/twitter-menfess"
      );
    }
  } else {
    ctx.reply("Ketik /start untuk memulai bot");
  }
});
bot.on("message", async (ctx) => {
  ctx.reply("Ketik /start untuk memulai bot");
});

if (process.env.PRODUCTION === "TRUE") {
 
  expressApp.use(bot.webhookCallback("/"));
  bot.telegram.setWebhook("https://vast-jade-angelfish-hat.cyclic.cloud");
  expressApp.get("/", (req, res) => {
    res.send("Hello World!");
  });

  expressApp.listen(3000, () => {
    console.log("Example app listening on port 3000!");
  });
} else {
  bot.launch();
}
