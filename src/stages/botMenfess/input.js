const Scene = require("telegraf/scenes/base");
const { checkverified } = require("../../services/airtable.services");

const input = new Scene("input");

input.enter(async (ctx) => {
  ctx.replyWithChatAction("typing");
  const regis = await checkverified(ctx.session.state.userInfo.username);
  switch (regis) {
    case 0:
      ctx.scene.enter("TwitterScene");
      break;
    case 1:
      ctx.reply(
        "Data anda belum diverifikasi, tunggu admin melakukan verifikasi"
      );
      break;
    case 2:
      ctx.scene.enter("MenfessCheck");
      break;
  }
});

module.exports = {
  input,
};
