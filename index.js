const Telegraf = require('telegraf');
const app = new Telegraf('240240780:AAE9KhlBspRdbgOrSJ4VieMrJ8OczXuUNO0');

app.hears('Привет', ctx => {
    return ctx.reply('Здарова');
});

app.startPolling();