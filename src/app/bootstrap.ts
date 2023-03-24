import { validate as validateEnvironmentVars } from 'env';

import Botlike from 'src/botlike/core';
import { initializeBot } from './initializeBot';
import { registerNetworks } from 'config/adapter'; // X-TODO: cleanup & rename - use env or args?

export default async () => {
  try {
    /** validate environment - make sure dotenv.config() has loaded .env file vars first */
    validateEnvironmentVars();

    /** initialize Botlike Singleton */
    await initializeBot(new Botlike(), registerNetworks);
  } catch (err) {
    console.error('App bootstrap error: ', err);
  }
};
