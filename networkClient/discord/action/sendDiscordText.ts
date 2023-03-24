import type { ActionResult } from 'src/actions/actionResponsePayload';
import { DiscordResponseData } from '../types';

export const sendDiscordText = async (
  element: ActionResult,
  { client, message }: DiscordResponseData,
) => {
  return message.channel.send(element.data);
};
