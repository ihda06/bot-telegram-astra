const { logsRequest } = require("./middleware/logs");
const session = require("telegraf/session");
const { stage } = require("./stages");

const { Telegraf } = require("telegraf");
const express = require("express");
const Airtables = require("./utils/Airtable");
const transformData = require("./utils/TransformData");

require("dotenv").config();

const expressApp = express();

const randomizer = (data) => {
  const randomNumber = Math.floor(Math.random() * data.length);
  return data[randomNumber];
};

const bot = new Telegraf(
  process.env.PRODUCTION === "TRUE"
    ? process.env.API_TOKEN
    : process.env.API_TOKEN_DEV
);

bot.use(logsRequest);
bot.use(session());
bot.use(stage.middleware());
// Register middleware
bot.start((ctx) => {
  ctx.scene.enter("welcome");
  if (ctx.message) {
    ctx.session.state = { userInfo: ctx.message.from };
  }
});
bot.command("tes", async (ctx) => {
  try {
    console.log("getting message..");
    let rawdata = await Airtables("TopikGenerator").select().all();
    console.log("message dapet");
    rawdata = transformData(rawdata);
    const topik = randomizer(rawdata);
    ctx.reply(
      `Berikut topik pembicaraan yang mungkin cocok untuk kamu bahas dengan teman atau pasangan kamu\n \n${topik.Topik}`,
      {
        reply_markup: {
          inline_keyboard: [
            /* One button */
            [{ text: "Tambah Topik", callback_data: "TambahTopik" }],
            [{ text: "Menu", callback_data: "menu" }],
            [{ text: "Topik Lain", callback_data: "TopikGenerator" }],
          ],
        },
      }
    );
  } catch (error) {
    console.log(error);
    ctx.reply("error");
  }
});
// bot.telegram.webhookReply = false
bot.on("message", (ctx) => ctx.reply("Tolong isi sesuai format ya"));
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
