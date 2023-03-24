import TelegramClient from 'node-telegram-bot-api';
import { BotNetworkModule } from 'src/botlike/core/botlike.types';
import { handleTelegramPrompt } from './messageHandler';

import type { TelegramEventBindings } from './types';

export const telegramEventBindings = (
  module: BotNetworkModule<TelegramClient>,
): Partial<TelegramEventBindings> => ({
  message: (msg: TelegramClient.Message, metadata: TelegramClient.Metadata) => {
    handleTelegramPrompt(msg, module, { messageMetaData: metadata });
  },
  channel_post: (msg: TelegramClient.Message) => {
    handleTelegramPrompt(msg, module);
  },
  group_chat_created: (msg: TelegramClient.Message) => {
    handleTelegramPrompt(msg, module);
  },
  error: (err: Error) => console.error(err),
  polling_error: (err: Error) => console.error(err),
  webhook_error: (err: Error) => console.error(err),
  poll_answer: (answer: TelegramClient.PollAnswer) =>
    console.log('Polling has first response'),
  // TESTING
  callback_query: (...args) => console.log('callback_query called', args), // this is called via button actions
  chosen_inline_result: (...args) => console.log('chosen_inline_result called', args),
  inline_query: (...args) => console.log('inline_query called', args),
  web_app_data: (...args) => console.log('web_app_data called', args),
});
