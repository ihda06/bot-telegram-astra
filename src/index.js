const { logsRequest } = require("./middleware/logs");
const session = require("telegraf/session");
const { stage } = require("./stages");
const { Telegraf } = require("telegraf");
const express = require("express");
const { verifyFolow } = require("./command/twitterBot");
const rwClient = require("./utils/twitterClient");
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
// Register middleware
bot.start(async (ctx) => {
  ctx.scene.enter("welcome");
  if (ctx.message) {
    ctx.session.state = { userInfo: ctx.message.from };
  }
});

bot.on("message", async(ctx) => {
  ctx.reply("Tolong isi sesuai format ya");
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
