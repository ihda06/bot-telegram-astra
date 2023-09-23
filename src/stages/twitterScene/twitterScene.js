const Scene = require("telegraf/scenes/base");
const { TwitterBot } = require("../../command/twitterBot");
const Airtables = require("../../utils/Airtable");
const TwitterScene = new Scene("TwitterBot");

TwitterScene.enter((ctx) => {
  ctx.editMessageText("Klik tombol dibawah untuk memulai", {
    reply_markup: {
      inline_keyboard: [
        /* One button */
        [{ text: "Mulai", callback_data: "mulai" }],
      ],
    },
  });
});
TwitterScene.action("mulai", async (ctx) => {
  ctx.reply("Verifikasi data....");
  const usnTele = ctx.session.state.userInfo.username;
  console.log("fetching ...");
  try {
    const data = await Airtables("databaseTwitter")
      .select({ filterByFormula: `username_tele = "${usnTele}"` })
      .all();
    console.log("fetching success");
    if (data.length === 0) {
      await ctx.reply(
        "Data anda belum kami simpan, untuk menggunakan bot ini data anda perlu disimpan",
        {
          reply_markup: {
            inline_keyboard: [
              /* One button */
              [
                { text: "Bersedia ✅", callback_data: "register/yes" },
                { text: "Tidak Bersedia ❌", callback_data: "register/no" },
              ],
            ],
          },
        }
      );
    } else {
      if (data[0].fields.verified) {
        await ctx.scene.enter("SendScene");
      } else {
        await ctx.reply(
          "Data anda belum diverifikasi, tunggu admin melakukan verifikasi"
        );
        await ctx.scene.enter("welcome");
      }
    }
  } catch (error) {
    console.log(error);
  }
});
TwitterScene.action("register/yes", (ctx) => {
  ctx.scene.enter("twitter/registerScene");
});
TwitterScene.action("register/no", (ctx) => {
  ctx.scene.enter("welcome");
});

module.exports = { TwitterScene };
