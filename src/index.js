// const { default: Telegraf } = require("telegraf");
// const { logsRequest } = require("./middleware/logs");
// const session = require("telegraf/session");
// const { stage } = require("./stages");
// require("dotenv").config();
// const express = require("express");

// const bot = new Telegraf(process.env.API_TOKEN);
// // console.log("NODE ENV", process.env.NODE_ENV);
// // console.log("ini production");
// // const app = express();
// // app.use(express.json());
// // app.use(webhookCallback(bot, "express"));

// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //   console.log(`Bot listening on port ${PORT}`);
// // });

// bot.use(logsRequest);
// bot.use(session());
// bot.use(stage.middleware());

// // bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
// bot.on("message", (ctx) => ctx.reply("Got another message!"));

// const { Telegraf } = require('telegraf')

// bot.telegram.setWebhook('https://vast-jade-angelfish-hat.cyclic.cloud/secret-path')

// // bot.on("text", (ctx) => ctx.reply("Hello World"));
// bot.launch().then(() => {
//   console.log('Bot is running!');
// });;

// if (process.env.NODE_ENV === "production") {
// } else {
//   console.log("ini dev");
//   bot.start((ctx) => {
//     ctx.scene.enter("welcome");
//   });
// }

const { Telegraf } = require("telegraf");
const express = require("express");
const expressApp = express();

const bot = new Telegraf(process.env.API_TOKEN);

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", (ctx) => ctx.reply("Got another message!"));
expressApp.use(bot.webhookCallback("/"));
bot.telegram.setWebhook("https://vast-jade-angelfish-hat.cyclic.cloud");

expressApp.get("/", (req, res) => {
  res.send("Hello World!");
});

expressApp.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
