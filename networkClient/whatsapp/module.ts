import { service } from 'src/botlike/bot/default/state/PromptMachine';

import { baseBotConfig } from '../../src/app/baseBotConfig';

import type { BotNetworkModule } from 'src/botlike/core/botlike.types';
import type { WhatsappClient } from 'src/types/whatsapp.types';

import { whatsappEventBindings } from './eventBindings';

const whatsappNetworkModule = async (): Promise<BotNetworkModule<WhatsappClient>> => {
  const client = (await (
    await import(`networkClient/whatsapp/client`)
  ).default()) as WhatsappClient;

  if (!client) throw Error(`Whatsapp client could not be loaded`);

  const botConfig = {
    ...baseBotConfig,
    name: 'WhatsappBot',
  };

  const moduleConfig: BotNetworkModule<WhatsappClient> = {
    type: 'whatsapp',
    client,
    botConfig,
    service,
  };

  return {
    ...moduleConfig,
    eventBindings: whatsappEventBindings(moduleConfig),
  };
};

export default whatsappNetworkModule;
