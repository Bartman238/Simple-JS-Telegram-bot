const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const bot = new Telegraf('240240780:AAE9KhlBspRdbgOrSJ4VieMrJ8OczXuUNO0');

bot.hears('Привет', ctx => {
    return ctx.reply('Здарова', Extra.inReplyTo(ctx.message.message_id));
});

bot.telegram.getMe().then((bot_informations) => {
    bot.options.username = bot_informations.username;
    console.log(bot_informations.username + " started");
});

bot.command('Test', (ctx) => ctx.reply('HelloWorld'));

bot.hears('Пошел нахуй', (ctx) => ctx.reply('Нет ты'));

bot.startPolling();