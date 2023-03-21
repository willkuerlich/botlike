import env from 'env';
import TelegramBot from 'node-telegram-bot-api';

// TODO: create commander program to validate and execute admin prompt
// if a valid call has been executed change this flag to prevent further processing
// should have logic for:
// - handling global admin logic
// - handling telegram bot admin logic

export const evaluateTelegramUtilityCall = (msg: TelegramBot.Message) => {
  let isUtilityCall = false;
  // // const qm = await msg.getQuotedMessage() // X-TODO: try
  // // const bot = Botlike.instance;
  // // console.log('handlePrompt bot: ', bot);

  // // CHECK FOR BOT SUBSCRIBED CHANNELS
  // const channelId = '';
  // const waAccountId = env.WA_ACCOUNT_ID;

  // console.log('message author: ', msg.author);
  // console.log('message from: ', msg.from);
  // console.log('message to: ', msg.to);

  // if (msg.from === waAccountId) {
  //   // msg.author suffixed with :72 ??? => 491607873415:72@c.us
  //   console.log('A message from my master, msg:', msg.body);

  //   // public admin logic here // X-WARNING: everyone is listening
  // }

  // if (msg.from === waAccountId && msg.to === waAccountId) {
  //   // private admin logic here // X-WARNING: WA servers are listening
  //   console.log('A private message from my master, msg:', msg.body);
  // }

  return {
    isUtilityCall,
  };
};
