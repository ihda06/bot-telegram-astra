const { logsRequest } = require("./middleware/logs");
const session = require("telegraf/session");
const { stage } = require("./stages");

const { Telegraf } = require("telegraf");
const express = require("express");
const { botMenfessStage } = require("./stages/botMenfess/botMenfess");
require("dotenv").config();
const expressApp = express();

const bot = new Telegraf(
  process.env.PRODUCTION === "TRUE"
    ? process.env.API_TOKEN
    : process.env.API_TOKEN_DEV
);

bot.use(logsRequest);
bot.use(session());
bot.use(stage.middleware());
bot.use(botMenfessStage.middleware());
// Register middleware
bot.start(async (ctx) => {
  ctx.scene.enter("welcome");
  if (ctx.message) {
    ctx.session.state = { userInfo: ctx.message.from };
  }
});
bot.on("message", (ctx, next) => {
  if (!ctx.message.photo) {
    const menfess = ctx.message.text;
    if (menfess.search(/Cjr!/) >= 0) {
      ctx.scene.enter("input");
      if (ctx.message) {
        ctx.session.state = {
          userInfo: ctx.message.from,
          menfess: ctx.message.text,
        };
      }
    } else {
      next();
    }
  } else {
    ctx.reply("Silahkan gunakan web untuk mengirim foto");
    next();
  }
});

bot.on("message", async (ctx) => {
  ctx.reply(
    "Ketik /start untuk memulai bot atau gunakan trigger Cjr! untuk mengirim menfess"
  );
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
