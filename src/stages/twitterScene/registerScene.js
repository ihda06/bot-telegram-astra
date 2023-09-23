
const WizardScene = require("telegraf/scenes/wizard");
const {
  registerTelegram,
  registerTwitter,
} = require("../../command/twitterBot");
const TwitterRegisterScene = new WizardScene(
  "twitter/registerScene",
  async (ctx) => {
    await registerTelegram(ctx);
    ctx.reply(
      "Kami perlu memastikan akun kamu sudah follow kami atau belum\n \nSilahkan tulis username twitter kamu tanpa @\n \nContoh cjr_fess"
    );
    return ctx.wizard.next();
  },
  async (ctx) => {
    await registerTwitter(ctx);
    ctx.scene.enter("welcome")
  }
);

module.exports = TwitterRegisterScene;
