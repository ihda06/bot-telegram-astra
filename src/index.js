const { default: Telegraf } = require("telegraf");
const { logsRequest } = require("./middleware/logs");
const session = require("telegraf/session");
const { stage } = require("./stages");
require('dotenv').config();
const express = require('express')
const expressApp = express()

const bot = new Telegraf(process.env.API_TOKEN)
console.log("check api token", process.env.API_TOKEN);



// const { Telegraf } = require('telegraf')


expressApp.use(bot.webhookCallback('/secret-path'))
bot.telegram.setWebhook('https://vast-jade-angelfish-hat.cyclic.cloud/secret-path')

expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})

bot.use(logsRequest);
bot.use(session());
bot.use(stage.middleware());
bot.start((ctx) => {
  ctx.scene.enter("welcome");
});

// bot.on("text", (ctx) => ctx.reply("Hello World"));
bot.launch();

expressApp.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
