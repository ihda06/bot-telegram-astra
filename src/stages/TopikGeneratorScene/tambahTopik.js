const Scene = require("telegraf/scenes/base");
const Airtables = require("../../utils/Airtable");

const tambahTopik = new Scene("tambahtopik");
tambahTopik.enter((ctx) => {
  ctx.reply("Silahkan tulis topik yang ingin ditambahkan ....", {
    reply_markup: {
      inline_keyboard: [
        /* One button */
        [{ text: "Ga Jadi ❌❌", callback_data: "cancel" }],
      ],
    },
  });
});
tambahTopik.on("message", async (ctx) => {
  try {
    const text = ctx.message.text
    await Airtables("TopikGenerator").create([
      {
        fields: {
          "Topik": text,
        },
      },
    ]);
    await ctx.reply("Topik berhasil ditambahkan");
    ctx.scene.enter("welcome");
  } catch(e) {
    console.error(e)
    ctx.reply("Topik gagal ditambahkan");
    ctx.scene.enter("welcome");
  }
});

tambahTopik.action("cancel", (ctx) => {
  ctx.scene.enter("welcome");
});
module.exports = { tambahTopik };
