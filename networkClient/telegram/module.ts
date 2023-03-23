import { service } from 'src/botlike/bot/default/state/PromptMachine';

import { baseBotConfig } from '../../src/app/baseBotConfig';

import { telegramEventBindings } from './eventBindings';

import type { BotNetworkModule } from 'src/botlike/core/botlike.types';
import type { TelegramClient } from 'src/types/telegram.types';

const telegramNetworkModule = async (): Promise<BotNetworkModule<TelegramClient>> => {
  const client = (await (
    await import(`networkClient/telegram/client`)
  ).default()) as TelegramClient;

  if (!client) throw Error(`Telegram client could not be loaded`);

  const botConfig = {
    ...baseBotConfig,
    name: 'TelegramBot',
  };

  const moduleConfig: BotNetworkModule<TelegramClient> = {
    type: 'telegram',
    client,
    botConfig,
    service,
  };

  return {
    ...moduleConfig,
    eventBindings: telegramEventBindings(moduleConfig),
  };
};

export default telegramNetworkModule;
