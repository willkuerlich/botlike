import DiscordJS from 'discord.js';
import { discordEvents } from './events';

import type { BaseEventBindings } from 'src/types/event.types';

export type DiscordEventType = (typeof discordEvents)[number];

// X-TODO: extend with common used events
export interface DiscordEventBindings extends BaseEventBindings {
  ready: (client: DiscordJS.Client) => void;
  messageCreate: (msg: DiscordJS.Message) => void;
}

export interface DiscordResponseData {
  message: DiscordJS.Message;
  client: DiscordJS.Client;
}
