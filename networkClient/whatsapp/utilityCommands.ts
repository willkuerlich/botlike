import env from 'env';

import { WhatsappMessage } from 'src/types/whatsapp.types';

// TODO: create commander program to validate and execute admin prompt
// if a valid call has been executed change this flag to prevent further processing
// should have logic for:
// - handling global admin logic
// - handling telegram bot admin logic

// group? 120363047815292127@g.us (spam party)
// group? 120363048123408118@g.us (askBot) / id: 30E0E7763F7E4981BA7CD9E0AEF9F5F6

// X-TODO: plan + enable admin features

export const evaluateWhatsappUtilityCall = (msg: WhatsappMessage) => {
  let isUtilityCall = false;
  // const qm = await msg.getQuotedMessage() // X-TODO: try
  // const bot = Botlike.instance;
  // console.log('handlePrompt bot: ', bot);

  // CHECK FOR BOT SUBSCRIBED CHANNELS
  const channelId = '';
  const waAccountId = env.WA_ACCOUNT_ID;

  console.log('message author: ', msg.author);
  console.log('message from: ', msg.from);
  console.log('message to: ', msg.to);

  if (msg.from === waAccountId) {
    // msg.author suffixed with :72 ??? => 491607873415:72@c.us
    console.log('A message from my master, msg:', msg.body);

    // public admin logic here // X-WARNING: everyone is listening
  }

  if (msg.from === waAccountId && msg.to === waAccountId) {
    // private admin logic here // X-WARNING: WA servers are listening
    console.log('A private message from my master, msg:', msg.body);
  }

  // TODO: create commander program to validate and execute admin prompt
  // if a valid call has been executed change this flag to prevent further processing

  return {
    isUtilityCall,
  };
};

// if (message.fromMe) {
//   // accept admin like commands if necessary
//   // watch out for user generated bot replay content which could call these commands as well..
//   // we could accept a public 1-time usage token (generate on website protected bei login) or limit usage only to private chat with ourself
// }

// const msg = message.body;

// console.log('--------------------------------');
// console.log('message info: ', message);
// console.log('--------------------------------');
// console.log('message author: ', message.author);
// console.log('message from: ', message.from);
// console.log('message to: ', message.to);
// console.log('--------------------------------');

// we want something like "$action@--width 1024 -h 512 ...utterance"
// but also "Hey toutterance" to be possible
