const Telegraf = require('telegraf');
const bot = new Telegraf('240240780:AAE9KhlBspRdbgOrSJ4VieMrJ8OczXuUNO0');

bot.hears('Привет', ctx => {
    return ctx.reply('Здарова');
});

bot.telegram.getMe().then((bot_informations) => {
    bot.options.username = bot_informations.username;
    console.log(bot_informations.username + " started");
});

bot.startPolling();