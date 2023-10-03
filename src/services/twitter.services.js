const threadMaker = require("../utils/threadMaker");
const rwClient = require("../utils/twitterClient");
const https = require("https");
const fs = require("fs");
const sharp = require("sharp");
const { readFile, writeFile } = require("fs/promises");

async function sendTweet(ctx, message) {
  try {
    let imageId = "";
    if (ctx.message.photo) {
      imageId = await handleImage(ctx);
    }
    const response = await rwClient.v1.tweet(message, { media_ids: imageId });
    ctx.reply(
      `Tweet terkirim \n\nLink Tweet : https://twitter.com/CjrFess/status/${response.data.id}`,
      {
        reply_markup: {
          inline_keyboard: [
            /* One button */
            [
              { text: "Kirim menfess lagi✅", callback_data: "restart" },
              { text: "Back to menu❌", callback_data: "menu" },
            ],
          ],
        },
      }
    );
  } catch (error) {
    ctx.reply("error");
    console.log(error);
  }
}

async function sendThread(ctx) {
  let thread = threadMaker(menfess);
  const response = await rwClient.v1.tweetThread(thread);
  // console.log(response);
  ctx.reply(
    `Tweet terkirim \n\nLink Tweet : https://twitter.com/CjrFess/status/${response[0].data.id}`,
    {
      reply_markup: {
        inline_keyboard: [
          /* One button */
          [
            { text: "Kirim menfess lagi✅", callback_data: "restart" },
            { text: "Back to menu❌", callback_data: "menu" },
          ],
        ],
      },
    }
  );
}

async function handleImage(ctx) {
  let imageId = ctx.message.photo.pop().file_id;

  let imageLink = await ctx.telegram.getFileLink(imageId);

  https.get(imageLink, async (response) => {
    return new Promise((resolve, reject) => {
      response.pipe(
        fs
          .createWriteStream(`public/images/image-menfess.jpeg`)
          .on("finish", resolve)
      );
    });
  });
  await wmImage(`public/images/image-menfess.jpeg`);
  let pathWm = "public/images/image-menfess-watermarked.png";
  let ImgTwitterId = await rwClient.v1.uploadMedia(pathWm);
  return ImgTwitterId;
}

const wmImage = async (img) => {
  let path = "public/images/image-menfess-watermarked.png";
  let watermark = await sharp(await readFile(img))
    .composite([
      { input: await readFile("public/images/wm.png"), top: 50, left: 50 },
    ])
    .png()
    .toBuffer();
  await writeFile(path, watermark);

  return path;
};


module.exports = { sendTweet, sendThread };
