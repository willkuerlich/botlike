import TelegramClient from 'node-telegram-bot-api';
import { sendTelegramImage } from './action/sendTelegramImage';
import { sendTelegramText } from './action/sendTelegramText';

import type { UniversalActionResponse } from 'src/actions/actionResponsePayload';
import { QueueProcess } from 'src/lib/queues/queueProcess';

export const telegramMessageQueue = (
  client: TelegramClient,
  message: TelegramClient.Message,
  actionResponse: UniversalActionResponse,
) => {
  try {
    // X-FIXME: ZOD validate payload

    const queue = new QueueProcess();

    actionResponse.results.forEach((element, idx) => {
      switch (element.dataInfo.dataType) {
        case 'image':
          queue.enqueue(async () => {
            await sendTelegramImage(element, {
              client,
              message,
            });
          });
          break;
        case 'text':
          queue.enqueue(async () => {
            await sendTelegramText(element, {
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
