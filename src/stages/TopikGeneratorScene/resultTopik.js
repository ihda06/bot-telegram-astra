const Scene = require("telegraf/scenes/base");
const Airtables = require("../../utils/Airtable");
const transformData = require("../../utils/TransformData");

// const topik = "abcdfg";
const closing = `/tambahtopik untuk menambahkan topik baru \n/menu untuk kembali ke menu`;
const ResultTopik = new Scene("ResultTopik");

const randomizer = (data) => {
  const randomNumber = Math.floor(Math.random() * data.length);
  return data[randomNumber];
};

ResultTopik.enter(async (ctx) => {
  ctx.reply(
    "Berikut topik pembicaraan yang mungkin cocok untuk kamu bahas dengan teman atau pasangan kamu"
  );
  let rawdata = await Airtables("TopikGenerator").select().all();
  rawdata = transformData(rawdata);
  const topik = randomizer(rawdata);
  ctx.reply(topik.Topik, {
    reply_markup: {
      inline_keyboard: [
        /* One button */
        [{ text: "Tambah Topik", callback_data: "TambahTopik" }],
        [{ text: "Menu", callback_data: "menu" }],
        [{ text: "Topik Lain", callback_data: "TopikGenerator" }],
      ],
    },
  });
});
ResultTopik.command("tambahtopik", (ctx) => {
  ctx.scene.enter("tambahtopik");
});
ResultTopik.command("menu", (ctx) => {
  ctx.scene.enter("postUse");
});
ResultTopik.command("TopikGenerator", (ctx) => {
  ctx.scene.enter("ResultTopik");
});
ResultTopik.action("TambahTopik", (ctx) => {
  ctx.scene.enter("tambahtopik");
});
ResultTopik.action("menu", (ctx) => {
  ctx.scene.enter("postUse");
});
ResultTopik.action("TopikGenerator", (ctx) => {
  ctx.scene.enter("ResultTopik");
});

ResultTopik.on("message", (ctx) => ctx.reply("Send `hi`"));
module.exports = { ResultTopik };
