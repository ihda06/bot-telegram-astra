const Scene = require("telegraf/scenes/base");
// const Airtables = require("../../utils/Airtable");
// const transformData = require("../../utils/TransformData");

// const topik = "abcdfg";
// const closing = `/tambahtopik untuk menambahkan topik baru \n/menu untuk kembali ke menu`;
const ResultTopik = new Scene("ResultTopik");

// const randomizer = (data) => {
//   const randomNumber = Math.floor(Math.random() * data.length);
//   return data[randomNumber];
// };

ResultTopik.command("cancel", (ctx)=>{
  ctx.scene.leave()
  ctx.reply("leaving")
})
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
  ctx.scene.enter("welcome");
});
ResultTopik.action("TopikGenerator", (ctx) => {
  ctx.scene.enter("ResultTopik");
});

ResultTopik.on("message", (ctx) => ctx.reply("Send `hi`"));
module.exports = { ResultTopik };
