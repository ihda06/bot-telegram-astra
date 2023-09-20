const Scene = require("telegraf/scenes/base");
const { leave } = require("telegraf/stage");

const tambahTopik = new Scene("tambahtopik");
tambahTopik.enter((ctx) => {
  ctx.reply("Silahkan masukan tulis topik yang ingin ditambahkan");
});
tambahTopik.command("menu", (ctx) => {
  ctx.scene.enter("welcome");
});
tambahTopik.on("message", (ctx) => {
  ctx.reply("Topik berhasil ditambahkan");
  ctx.scene.enter("postUse");
});
module.exports = { tambahTopik };
