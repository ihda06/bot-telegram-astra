
const Airtables = require("../utils/Airtable");
const transformData = require("../utils/TransformData");

const randomizer = (data) => {
  const randomNumber = Math.floor(Math.random() * data.length);
  return data[randomNumber];
};

const TopikGenerator = async (ctx) => {
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
            [{ text: "Topik Lain", callback_data: "topiklain" }],
          ],
        },
      }
    );
  } catch (error) {
    console.log(error);
    ctx.reply("error");
  }
};

module.exports = { TopikGenerator };
