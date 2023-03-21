import TelegramClient from 'node-telegram-bot-api';
import { universalMessageHandler } from 'src/botlike/prompt/universalMessageHandler';
import { evaluateTelegramUtilityCall } from './utilityCommands';

import { telegramImageRequest, telegramTextRequest } from './request';

// import { commandValidationPipeline } from 'src/app/middleware/commandValidationPipeline';

import type { BotNetworkModule } from 'src/botlike/core/botlike.types';
import { telegramMessageQueue } from './messageQueue';
// import { buttonMenuTest } from './menu/menuButtonTest'; // X-TODO: use later

// handleTelegram-Channel/Group/Direct-Prompt
export const handleTelegramPrompt = (
  message: TelegramClient.Message,
  { client, botConfig }: BotNetworkModule<TelegramClient>,
  args?: {
    messageMetaData: TelegramClient.Metadata;
  },
) => {
  const { isUtilityCall } = evaluateTelegramUtilityCall(message);
  if (isUtilityCall) return; // or reply with a command confirmation privately

  if (!message.text) return;

  const msgType: 'chat' | 'image' = message.photo ? 'image' : 'chat'; // X-FIXME: better tg specific differentiation

  switch (msgType) {
    case 'chat':
      universalMessageHandler(
        telegramTextRequest(
          botConfig,
          message,
          (actionResponse) => telegramMessageQueue(client, message, actionResponse),
          /* pass validationPipeline as args */
        ),
      );
      break;
    case 'image':
      universalMessageHandler(
        telegramImageRequest(
          botConfig,
          message,
          (actionResponse) => telegramMessageQueue(client, message, actionResponse),
          /* pass validationPipeline as args */
        ),
      );
      break;
    default:
      console.warn(`handleTelegramPrompt(): Unknown message type "${msgType}"`);
      break;
  }
};
