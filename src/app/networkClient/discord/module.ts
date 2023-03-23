import { service } from 'src/botlike/bot/default/state/PromptMachine';

import { baseBotConfig } from '../../baseBotConfig';
import { loadNetworkClient } from '../loadNetworkClient';

import type { BotNetworkModule } from 'src/botlike/core/botlike.types';
import type { DiscordClient } from 'src/types/discord.types';

import { discordEventBindings } from './eventBindings';

const discordNetworkModule = async (): Promise<BotNetworkModule<DiscordClient>> => {
  const client = await loadNetworkClient<DiscordClient>('discord');

  if (!client) throw Error(`Discord client could not be loaded`);

  const botConfig = {
    ...baseBotConfig,
    name: 'DiscordBot',
  };

  const moduleConfig: BotNetworkModule<DiscordClient> = {
    type: 'discord',
    client,
    botConfig,
    service,
  };

  return {
    ...moduleConfig,
    eventBindings: discordEventBindings(moduleConfig),
  };
};

export default discordNetworkModule;
