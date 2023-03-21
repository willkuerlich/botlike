import TelegramClient from 'node-telegram-bot-api';
// import { formatImageInfo } from 'src/lib/image/formatImageInfo';

import type { ActionResult } from 'src/actions/actionResponsePayload';
import { TelegramResponseData } from '../types';

export const sendTelegramText = async (
  element: ActionResult,
  { client, message }: TelegramResponseData,
) => {
  // const sendPhotoMessageOptions: TelegramClient.SendPhotoOptions = {
  //   has_spoiler: true, // boolean | undefined;
  //   caption: formatImageInfo(element.dataInfo),
  //   disable_notification: true, // disable for groups for now, but activate later if a pm is sent
  //   reply_to_message_id: message.message_id,
  //   // reply_markup: buttonMenuTest,
  // };

  const sendTextMessageOptions: TelegramClient.SendMessageOptions = {
    // parse_mode?: "Markdown" | "MarkdownV2" | "HTML"
    // disable_web_page_preview?: boolean
    // message_thread_id?: number | undefined;
    // disable_notification?: boolean | undefined;
    // reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply | undefined;
    // protect_content?: boolean | undefined;
    // allow_sending_without_reply?: boolean | undefined;
    reply_to_message_id: message.message_id,
  };

  return client.sendMessage(message.chat.id, element.data, sendTextMessageOptions);
};
