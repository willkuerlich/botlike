import { formatImageInfo } from 'src/lib/image/formatImageInfo';

import type { ActionResult } from 'src/actions/actionResponsePayload';
import WAWebJS from 'whatsapp-web.js';
import { WhatsappResponseData } from '../types';

export const sendWhatsappImage = async (
  element: ActionResult,
  { client, message }: WhatsappResponseData,
) => {
  const media = new WAWebJS.MessageMedia('image/jpg', element.data, 'Botlike-image.jpg');
  const content: WAWebJS.MessageContent = formatImageInfo(element.dataInfo);
  const sendOptions: WAWebJS.MessageSendOptions = {
    media: media || undefined,
    // caption: msg.id.id,
    // media: reply as any as MessageMedia,
    // sendMediaAsSticker: true,
    // sendMediaAsDocument: true,
  };
  return message.reply(content, undefined, sendOptions);
  // return client.sendMessage(message.id.remote, content, sendOptions);
};
