import TelegramClient from 'node-telegram-bot-api';

import { BotNetworkModule } from 'src/botlike/core/botlike.types';
import { service } from 'src/botlike/bot/default/state/PromptMachine';

import { baseBotConfig } from '../../baseBotConfig';
import { loadNetworkClient } from '../loadNetworkClient';

import { telegramEventBindings } from './eventBindings';

const telegramNetworkModule = async (): Promise<BotNetworkModule> => {
  const client = await loadNetworkClient<TelegramClient>('telegram');

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
