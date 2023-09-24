const Airtables = require("../utils/Airtable");
const rwClient = require("../utils/twitterClient");

const TwitterBot = async (ctx) => {
  try {
    const usnTele = await ctx.session.state.userInfo.username;
    await ctx.reply("Verifikasi data....");
    const data = await Airtables("databaseTwitter")
      .select({ filterByFormula: `username_tele = "${usnTele}"` })
      .all();
    if (data.length === 0) {
      ctx.reply(
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
        ctx.scene.enter("SendScene");
      } else {
        ctx.reply(
          "Data anda belum diverifikasi, tunggu admin melakukan verifikasi"
        );
        ctx.scene.enter("welcome");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const registerTelegram = async (ctx) => {
  ctx.editMessageText("Menyimpan data telegram ...");
  try {
    const usnTele = ctx.session.state.userInfo.username;
    const success = await Airtables("databaseTwitter").create([
      {
        fields: {
          username_tele: usnTele,
        },
      },
    ]);

    ctx.scene.state = { userId: success[0].id };
    ctx.editMessageText("Data telegram berhasil disimpan✅");
  } catch (error) {
    console.log(error);
    ctx.reply("error");
  }
};

const registerTwitter = async (ctx) => {
  try {
    const usnTwt = ctx.message.text;
    await ctx.reply("Data sedang disimpan....");
    const update = await Airtables("databaseTwitter").update(
      ctx.scene.state.userId,
      {
        username_twitter: usnTwt,
      }
    );
    await ctx.reply(
      "Data berhasil disimpan \n\nData kamu perlu diverifikasi oleh admin terlebih dahulu, coba ulang nanti ya"
    );
  } catch (error) {
    console.log(error);
    ctx.reply("error");
  }
};

const verifyFolow = async (username) => {
  const datas = await rwClient.v2.userByUsername(username);
  console.log(datas);
};

module.exports = { TwitterBot, registerTelegram, registerTwitter, verifyFolow };
