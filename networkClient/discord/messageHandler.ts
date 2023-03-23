// import TelegramClient from 'node-telegram-bot-api';
import DiscordJS from 'discord.js';
import { universalMessageHandler } from 'src/botlike/prompt/universalMessageHandler';
import { evaluateDiscordUtilityCall } from './utilityCommands';

import { discordImageRequest, discordTextRequest } from './request';

// import { commandValidationPipeline } from 'src/app/middleware/commandValidationPipeline';

import type { BotNetworkModule } from 'src/botlike/core/botlike.types';
import { discordMessageQueue } from './messageQueue';
// import { buttonMenuTest } from './menu/menuButtonTest'; // X-TODO: use later

// handleTelegram-Channel/Group/Direct-Prompt
export const handleDiscordPrompt = (
  message: DiscordJS.Message,
  { client, botConfig }: BotNetworkModule<DiscordJS.Client>,
  args?: {
    // messageMetaData: TelegramClient.Metadata;
  },
) => {
  const { isUtilityCall } = evaluateDiscordUtilityCall(message);
  if (isUtilityCall) return; // or reply with a command confirmation privately

  if (!message.content) return; // ignore empty messages
  if (message.author.bot) return; // do not reply to messages created by bots

  // const msgType: 'chat' | 'image' = message.photo ? 'image' : 'chat'; // X-FIXME: better tg specific differentiation
  const msgType: 'chat' | 'image' = 'chat'; // X-TODO:

  switch (msgType) {
    case 'chat':
      universalMessageHandler(
        discordTextRequest(
          botConfig,
          message,
          (actionResponse) => discordMessageQueue(client, message, actionResponse),
          /* pass validationPipeline as args */
        ),
      );
      break;
    // case 'image':
    //   universalMessageHandler(
    //     discordImageRequest(
    //       botConfig,
    //       message,
    //       (actionResponse) => discordMessageQueue(client, message, actionResponse),
    //       /* pass validationPipeline as args */
    //     ),
    //   );
    //   break;
    default:
      console.warn(`handleTelegramPrompt(): Unknown message type "${msgType}"`);
      break;
  }
};
