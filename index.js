require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
const { getImage, getChat } = require("./Helper/functions");
const { Telegraf } = require("telegraf");

const configuration = new Configuration({
  apiKey: process.env.API,
});
const openai = new OpenAIApi(configuration);
module.exports = openai;

const bot = new Telegraf(process.env.TG_API);
bot.start((ctx) => ctx.reply("Selamat Datang Cok, Takok opo sembarangg nek kene, Join Grub @internetgratishoax"));

bot.help((ctx) => {
  ctx.reply(
    "Command Bot ini cok \n /gambar -> buat gambar dari text \n /tanya -> takok opo ae bebas "
  );
});



// Image command
bot.command("gambar", async (ctx) => {
  const text = ctx.message.text?.replace("/gambar", "")?.trim().toLowerCase();

  if (text) {
   
    const res = await getImage(text);

    if (res) {
      ctx.sendChatAction("upload_photo");
      // ctx.sendPhoto(res);
      // ctx.telegram.sendPhoto()
      ctx.telegram.sendPhoto(ctx.message.chat.id, res, {
        reply_to_message_id: ctx.message.message_id,
      });
    }
  } else {
    ctx.telegram.sendMessage(
      ctx.message.chat.id,
      "Kasih deskripsi sehabis ketik ini cok /gambar",
      {
        reply_to_message_id: ctx.message.message_id,
      }
    );
  }
});

// Chat command

bot.command("tanya", async (ctx) => {
  const text = ctx.message.text?.replace("/tanya", "")?.trim().toLowerCase();

  if (text) {
    ctx.sendChatAction("typing");
    const res = await getChat(text);
    if (res) {
      ctx.telegram.sendMessage(ctx.message.chat.id, res, {
        reply_to_message_id: ctx.message.message_id,
      });
    }
  } else {
    ctx.telegram.sendMessage(
      ctx.message.chat.id,
      "Kalo Tanya Pake ini cok /tanya",
      {
        reply_to_message_id: ctx.message.message_id,
      }
    );
  
    //  reply("Kalo Tanya Pake ini cok /tanya");
  }
});



bot.launch();
