// import TelegramClient from 'node-telegram-bot-api';
import DiscordJS from 'discord.js';
import { sendDiscordImage } from './action/sendDiscordImage';
import { sendDiscordText } from './action/sendDiscordText';

import type { UniversalActionResponse } from 'src/actions/actionResponsePayload';
import { QueueProcess } from 'src/lib/queues/queueProcess';

export const discordMessageQueue = (
  client: DiscordJS.Client,
  message: DiscordJS.Message,
  actionResponse: UniversalActionResponse,
) => {
  try {
    // X-FIXME: ZOD validate payload

    const queue = new QueueProcess();

    actionResponse.results.forEach((element, idx) => {
      switch (element.dataInfo.dataType) {
        case 'image':
          queue.enqueue(async () => {
            await sendDiscordImage(element, {
              client,
              message,
            });
          });
          break;
        case 'text':
          queue.enqueue(async () => {
            await sendDiscordText(element, {
              client,
              message,
            });
          });
          break;
        default:
          break;
      }
    });
  } catch (e) {
    console.error('TG queue error: ', e);
  }
};
