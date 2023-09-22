const Scene = require("telegraf/scenes/base");
const { TopikGenerator } = require("../../command/topikGenerator");
const ResultTopik = new Scene("ResultTopik");

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
ResultTopik.action("TambahTopik", async(ctx) => {
  ctx.scene.enter("tambahtopik");
});
ResultTopik.action("menu", (ctx) => {
  ctx.scene.enter("welcome");
});
ResultTopik.action("topiklain", async(ctx) => {
  await TopikGenerator(ctx)
  ctx.scene.enter("ResultTopik");
});

ResultTopik.on("message", (ctx) => ctx.reply("Send `hi`"));
module.exports = { ResultTopik };
