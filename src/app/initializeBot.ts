import Botlike from 'src/botlike/core';

import { registerNetworks } from 'config/adapter'; // X-TODO: cleanup & rename - use env or args?

import { registerNetworkModule } from './registerNetworkModule';
import { timelogFormat } from 'src/lib/log.lib';

export const initializeBot = async (bot: Botlike) => {
  try {
    console.info(`${timelogFormat(new Date())} - Initializing bot`);

    /** load modules in parallel */
    registerNetworks.forEach(async (networkType) => {
      const module = await registerNetworkModule(networkType);

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
