const Telegraf = require('telegraf'),
    Extra = require('telegraf/extra'),
    config = require('dotenv').config(),
    bot = new Telegraf(process.env.BOT_TOKEN),
    fs = require('fs'),
    https = require('https'),
    downloadImg = require('image-downloader'),
    base64 = require('node-base64-image'),
    fetch = require('node-fetch');


bot.hears('Привет', ctx => {
    return ctx.reply('Здарова', Extra.inReplyTo(ctx.message.message_id));
});

bot.telegram.getMe().then((bot_informations) => {
    bot.options.username = bot_informations.username;
    console.log(bot_informations.username + " started");
});

bot.hears('Тест', (ctx) => {
    // console.log(ctx.message);
    console.log(ctx.message.chat);
    ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id).then(res => {
        console.log(res)
    });
})

bot.command('Test', (ctx) => ctx.reply('HelloWorld'));

bot.hears('че за аниме?', (ctx)  => {

    let fileId = ctx.message.reply_to_message.photo;

    if ( fileId ) {
        ctx.reply(`Хмм, дай-ка подумать...`, Extra.inReplyTo(ctx.message.message_id))
        ctx.telegram.getFile(fileId[fileId.length - 1].file_id).then(res => {
            let picLink = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${res.file_path}`;

            base64.encode(picLink, {string: true, local: false}, (err, img) => {
                fetch("https://trace.moe/api/search", {
                    method: "POST",
                    body: JSON.stringify({ image: img }),
                    headers: { "Content-Type": "application/json" }
                })
                    .then(res => res.json())
                    .then(result => {
                        if ( result.docs ) {
                            let anime = result.docs[0];
                            ctx.reply(`Вероятнее всего, енто ${anime.title_romaji}`, Extra.inReplyTo(ctx.message.message_id))
                        }
                    });
            })
        })
    } else {
        ctx.reply(`Мне нужна картинка`, Extra.inReplyTo(ctx.message.message_id))
    }
});


bot.command('roulette', (ctx) => {
    let randomNumber = getRandomNumber(0, 5);
    console.log(ctx.message.from.username + "'s roulette is " + randomNumber);
    if (randomNumber == 0) {
        ctx.reply("Бдыщ! Тебе прострелили руку, и теперь ты не можешь использовать стикосы. [" + randomNumber + "]", Extra.inReplyTo(ctx.message.message_id));
        //bot.telegram.kickChatMember(ctx.message.chat.id, ctx.message.from.id); // BAN!
        let correctResstrictDate = (Date.now() + 40000)/1000;
        let params = {
            until_date: correctResstrictDate,
            can_send_messages: true,
            can_send_media_messages: true,
            can_send_other_messages: false,
            can_add_web_page_previews: false
        };
        ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id).then(res => {
            if (res.status == 'member' && ctx.message.chat.type != 'private') {
                bot.telegram.restrictChatMember(ctx.message.chat.id, ctx.message.from.id, params);
                console.log(ctx.message.from.username + " has kicked " + "from " + ctx.message.chat.title);
            } else {
                console.log(`Error: ${ctx.message.from.username}'s from ${ctx.message.chat.title} role is ${res.status}`)
            }
        });
    } else {
        ctx.reply("Щелк... Тебе повезло. [" + randomNumber + "]", Extra.inReplyTo(ctx.message.message_id));
    }
});

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

bot.startPolling();