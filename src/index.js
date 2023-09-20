const { default: Telegraf } = require("telegraf");
const { logsRequest } = require("./middleware/logs");
const session = require("telegraf/session");
const { stage } = require("./stages");
require('dotenv').config();

const bot = new Telegraf(process.env.API_TOKEN)
console.log("check api token", process.env.API_TOKEN);

bot.use(logsRequest);
bot.use(session());
bot.use(stage.middleware());
bot.start((ctx) => {
  ctx.scene.enter("welcome");
});

// bot.on("text", (ctx) => ctx.reply("Hello World"));
bot.launch();

// var http = require('http');
// http.createServer(function (req, res) {
//     console.log(`Just got a request at ${req.url}!`)
//     res.write('Yo!');
//     res.end();
// }).listen(process.env.PORT || 3000);
