const Scene = require("telegraf/scenes/base");

const topik = "abcdfg";
const closing = `Jika kamu punya saran topik yang menarik untuk dibahas ketik /tambahtopik untuk menambahkan topik baru jika tidak ketik /menu untuk kembali ke menu`;

const ResultTopik = new Scene("ResultTopik");
ResultTopik.enter(async (ctx) => {
  await ctx.reply(
    "Berikut topik pembicaraan yang mungkin cocok untuk kamu bahas dengan teman atau pasangan kamu"
  );
  await ctx.reply(topik);
  await ctx.reply(closing);
});
ResultTopik.command("tambahtopik", (ctx) => {
  ctx.scene.enter("tambahtopik");
});
ResultTopik.command("menu", (ctx) => {
  ctx.scene.enter("welcome");
});

ResultTopik.on("message", (ctx) => ctx.reply("Send `hi`"));
module.exports = { ResultTopik };
