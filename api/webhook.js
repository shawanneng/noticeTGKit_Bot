process.env.NTBA_FIX_319 = 1;

require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const { telegramConfig } = require('../server/configs');
const axios = require('./app/request');

module.exports = async (request, response) => {
  try {
    const { body } = request;

    if (body.message) {
      const {
        chat: { id },
        text,
      } = body.message;
      const bot = new TelegramBot(telegramConfig.token);

      if (new RegExp(/\/relation /).test(text)) {
        let sendMsg = '';
        const focusingCdkey = temp?.replace('relation', '')?.trim();
        const { data = {} } = await axios({
          url: 'https://www.tgkit.fun/api/tg/setInfoByFocusingCdkey',
          method: 'post',
          data: { focusingCdkey, relationChatId: id },
        }).catch((err) => (sendMsg = err.message));
        const { code, msg, cdkey } = data;
        if (!sendMsg) {
          sendMsg = msg;
        }
        console.log('data:', data);
        await bot.sendMessage(id, sendMsg);
      } else {
        await bot.sendMessage(
          chatId,
          '<b>请以/relation+空格+密钥的形式来对接实时播报机器人,作者@Liuwa91</b>',
          {
            parse_mode: 'HTML',
          }
        );
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    response.send();
  }
};
