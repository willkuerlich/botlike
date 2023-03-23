// import { formatImageInfo } from 'src/lib/image/formatImageInfo';

import type { ActionResult } from 'src/actions/actionResponsePayload';
import { WhatsappResponseData } from '../types';

export const sendWhatsappText = async (
  element: ActionResult,
  { client, message }: WhatsappResponseData,
) => {
  return message.reply(element.data);
  // return client.sendMessage(message.id.remote, element.data);
};
