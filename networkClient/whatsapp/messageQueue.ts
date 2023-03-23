import { sendWhatsappImage } from './action/sendWhatsappImage';
import { sendWhatsappText } from './action/sendWhatsappText';

import type { UniversalActionResponse } from 'src/actions/actionResponsePayload';
import { QueueProcess } from 'src/lib/queues/queueProcess';
import { WhatsappClient, WhatsappMessage } from 'src/types/whatsapp.types';

export const whatsappMessageQueue = (
  client: WhatsappClient,
  message: WhatsappMessage,
  actionResponse: UniversalActionResponse,
) => {
  try {
    // X-FIXME: ZOD validate payload

    const queue = new QueueProcess();

    actionResponse.results.forEach((element, idx) => {
      switch (element.dataInfo.dataType) {
        case 'image':
          queue.enqueue(async () => {
            await sendWhatsappImage(element, {
              client,
              message,
            });
          });
          break;
        case 'text':
          queue.enqueue(async () => {
            await sendWhatsappText(element, {
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
    console.error('WA queue error: ', e);
  }
};
