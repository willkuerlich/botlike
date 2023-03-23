import DiscordJS from 'discord.js';
import { BotNetworkModule } from 'src/botlike/core/botlike.types';
import { handleDiscordPrompt } from './messageHandler'; // X-TODO

import type { DiscordEventBindings } from './types';

export const discordEventBindings = (
  module: BotNetworkModule<DiscordJS.Client>,
): Partial<DiscordEventBindings> => ({
  // ready: (client: DiscordJS.Client) => console.log('Discord ready, client: ', client),
  ready: (client: DiscordJS.Client) => console.log('Discord ready'),
  messageCreate: (msg: DiscordJS.Message) => {
    console.log('message create');
    handleDiscordPrompt(msg, module);
  },
  // interactionCreate: (interaction: DiscordJS.Interaction) => {
  //   console.log('interaction create');
  // },
  // threadUpdate: () => {
  //   console.log('threadUpdate');
  // },
  // webhookUpdate: () => {
  //   console.log('webhookUpdate');
  // },
  // messageUpdate: () => {
  //   console.log('messageUpdate');
  // },
  // channelUpdate: () => {
  //   console.log('channelUpdate');
  // },
  // autoModerationActionExecution: () => {
  //   console.log('autoModerationActionExecution');
  // },
});
