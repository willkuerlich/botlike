import processArgs from 'args';
import { validate as validateEnvironmentVars } from 'env';
import { botlikeConfig } from 'config/bot/botConfig';

import Botlike from 'src/botlike/core';
import { initializeBot } from './initializeBot';

export default async () => {
  try {
    /** use process / env to determine if special logic/config should be loaded */
    // const {
    //   debug,
    //   /* mode, registerNetworks */
    // } = processArgs;

    /** validate environment - make sure dotenv.config() has loaded .env file vars first */
    validateEnvironmentVars();

    /** initialize Botlike Singleton */
    await initializeBot(new Botlike(botlikeConfig, processArgs));
  } catch (err) {
    console.error('App bootstrap error: ', err);
  }
};
