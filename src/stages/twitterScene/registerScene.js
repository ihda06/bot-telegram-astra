const WizardScene = require("telegraf/scenes/wizard");
const {
  registerTelegram,
  registerTwitter,
  register,
} = require("../../command/twitterBot");
const TwitterRegisterScene = new WizardScene(
  "twitter/registerScene",
  async (ctx) => {
    await ctx.reply(
      "Kami perlu memastikan akun kamu sudah follow kami atau belum\n \nSilahkan tulis username twitter kamu tanpa @\n \nContoh cjr_fess"
      );
      return ctx.wizard.next();
    },
    async (ctx) => {
    await register(ctx)
    ctx.scene.leave()
    ctx.scene.enter("welcome");
  }
);

module.exports = TwitterRegisterScene;
