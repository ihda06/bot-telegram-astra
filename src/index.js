const { default: Telegraf } = require("telegraf");
const { logsRequest } = require("./middleware/logs");
const session = require("telegraf/session");
const { stage } = require("./stages");
require('dotenv').config();
const express = require('express')


const bot = new Telegraf(process.env.API_TOKEN)

bot.use(logsRequest);
bot.use(session());
bot.use(stage.middleware());

// bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", (ctx) => ctx.reply("Got another message!"));


// const { Telegraf } = require('telegraf')


// bot.telegram.setWebhook('https://vast-jade-angelfish-hat.cyclic.cloud/secret-path')



// // bot.on("text", (ctx) => ctx.reply("Hello World"));
// bot.launch().then(() => {
//   console.log('Bot is running!');
// });;

if (process.env.NODE_ENV === "production") {
  console.log("ini production");
  const app = express();
  app.use(express.json());
  app.use(webhookCallback(bot, "express"));
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Bot listening on port ${PORT}`);
  });
} else {
  console.log("ini dev");
  bot.start((ctx) => {
    ctx.scene.enter("welcome");
  });
}

