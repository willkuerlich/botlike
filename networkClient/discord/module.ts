import { service } from 'src/botlike/bot/default/state/PromptMachine';

import { baseBotConfig } from 'config/bot/baseBotConfig';

import type { BotNetworkModule } from 'src/botlike/core/botlike.types';
import type { DiscordClient } from 'src/types/discord.types';

import { discordEventBindings } from './eventBindings';

const discordNetworkModule = async (): Promise<BotNetworkModule<DiscordClient>> => {
  const client = (await (
    await import(`networkClient/discord/client`)
  ).default()) as DiscordClient;

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
