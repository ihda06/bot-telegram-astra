const { logsRequest } = require("./middleware/logs");
const session = require("telegraf/session");
const { stage } = require("./stages");

const { Telegraf } = require("telegraf");
const express = require("express");
const expressApp = express();

const bot = new Telegraf(process.env.API_TOKEN);

bot.use(logsRequest);
bot.use(session());
bot.use(stage.middleware());
bot.start((ctx) => {
  ctx.scene.enter("welcome");
});

bot.on("message", (ctx) => ctx.reply("Tolong isi sesuai format ya"));
expressApp.use(bot.webhookCallback("/"));
bot.telegram.setWebhook("https://vast-jade-angelfish-hat.cyclic.cloud");

expressApp.get("/", (req, res) => {
  res.send("Hello World!");
});

expressApp.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
