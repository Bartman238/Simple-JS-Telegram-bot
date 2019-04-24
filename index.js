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

bot.hears('Тест', (ctx) => ctx.reply('Нет ты'));

bot.hears('Бот, какое аниме?', (ctx)  => {
    let msgWithPhoto = ctx.message.reply_to_message.photo[2].file_id;
    console.log("File ID is " + msgWithPhoto);
    function searchAnime() {
        
    }

    ctx.reply("Это аниме", Extra.inReplyTo(ctx.message.reply_to_message.message_id));
    
});

bot.command('roulette', (ctx) => {
    let randomNumber = getRandomNumber(0, 8);
    console.log(ctx.message.from.username + "'s roulette is " + randomNumber);
    if (randomNumber == 0) {
        ctx.reply("Бдыщ! Ты убит [" + randomNumber + "]", Extra.inReplyTo(ctx.message.message_id));
        bot.telegram.kickChatMember(ctx.message.chat.id, ctx.message.from.id);
        console.log(ctx.message.from.username + " has kicked " + "from " + ctx.message.chat.title);
    } else {
        ctx.reply("Щелк... Тебе повезло [" + randomNumber + "]", Extra.inReplyTo(ctx.message.message_id));
    }
});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

bot.startPolling();