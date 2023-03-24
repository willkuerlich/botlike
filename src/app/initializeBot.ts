import Botlike from 'src/botlike/core';

import { loadNetworkModule } from './loadNetworkModule';
import { timelogFormat } from 'src/lib/log.lib';
import type { BotNetworkType } from 'src/botlike/core/botlike.types';

export const initializeBot = async (bot: Botlike, networkClients: BotNetworkType[]) => {
  try {
    console.info(`${timelogFormat(new Date())} - Initializing bot`);

    /** load modules in parallel */
    networkClients.forEach(async (networkType) => {
      const module = await loadNetworkModule(networkType);

      if (module) {
        console.info(
          `${timelogFormat(
            new Date(),
          )} - Network module "${networkType}" has been loaded`,
        );
        bot.registerNetworkModule(module);
      }
    });
  } catch (err) {
    console.error('App bootstrap error: ', err);
  }
};
