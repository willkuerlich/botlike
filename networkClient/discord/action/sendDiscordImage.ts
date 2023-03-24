import DiscordJS from 'discord.js';
import { formatImageInfo } from 'src/lib/image/formatImageInfo';

import type { ActionResult } from 'src/actions/actionResponsePayload';
import { DiscordResponseData } from '../types';

export const sendDiscordImage = async (
  element: ActionResult,
  { client, message }: DiscordResponseData,
) => {
  // const sendPhotoMessageOptions: TelegramClient.SendPhotoOptions = {
  //   // has_spoiler: true, // boolean | undefined;
  //   caption: formatImageInfo(element.dataInfo),
  //   disable_notification: true, // disable for groups for now, but activate later if a pm is sent
  //   reply_to_message_id: message.message_id,
  //   // reply_markup: buttonMenuTest,
  // };

  // const fileOpts: TelegramClient.FileOptions = {
  //   filename: 'image', // X-TODO:
  //   // contentType: 'image/png', // 'image/jpg', 'application/octet-stream' ?
  //   contentType: element.dataInfo.contentType || 'application/octet-stream', // X-TODO:
  // };

  // https://github.com/yagop/node-telegram-bot-api/blob/master/doc/usage.md#sending-files
  // https://core.telegram.org/bots/api#sending-files
  // https://core.telegram.org/bots/api#sendphoto
  // https://pipedream.com/apps/telegram-bot-api/actions/send-photo
  // https://www.tabnine.com/code/javascript/functions/process/ProcessEnv/NTBA_FIX_350
  // https://github.com/yagop/node-telegram-bot-api/issues/694

  // const buffer = fs.readFileSync('.dummy/dummy.png');
  // const stream = fs.createReadStream('.dummy/dummy.png');
  // const file = 'image/jpg;base64,iVBORw0KGgoAAAANSUh...';
  // bot.sendPhoto(chatId, Buffer.from(file.substr(17), 'base64'), fileOpts);

  // return client.sendPhoto(
  //   message.chat.id,
  //   Buffer.from(element.data, element.dataInfo.encoding),
  //   sendPhotoMessageOptions,
  //   fileOpts,
  // );

  // const payload: DiscordJS.MessagePayload = {};

  const createOptions: DiscordJS.MessageCreateOptions = {
    reply: {
      // messageReference
    } as DiscordJS.ReplyOptions,
  };
  // message.reply()
  return message.channel.send(element.data);
};
