import TelegramClient from 'node-telegram-bot-api';
import { telegramEvents } from './events';

import type { BaseEventBindings } from 'src/types/event.types';

export type TelegramEventType = (typeof telegramEvents)[number];

// X-TODO: extend with common used events
export interface TelegramEventBindings extends BaseEventBindings {
  polling_error: (error: Error) => void;
  webhook_error: (error: Error) => void;
  error: (error: Error) => void;
  // status:
  poll_answer: (answer: TelegramClient.PollAnswer) => void;
  // messages:
  message: (message: TelegramClient.Message, metadata: TelegramClient.Metadata) => void;
  channel_post: (message: TelegramClient.Message) => void;
  group_chat_created: (message: TelegramClient.Message) => void;
  text: (message: TelegramClient.Message, metadata: TelegramClient.Metadata) => void;
}

export interface TelegramResponseData {
  message: TelegramClient.Message;
  client: TelegramClient;
}
