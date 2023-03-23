import env from 'env';
import TelegramClient from 'node-telegram-bot-api';

import { sleep } from 'src/lib/utility.lib';

const tgInitOptions: TelegramClient.ConstructorOptions = {
  polling: {
    interval: 1000, // string | number | undefined;
    autoStart: true,
    params: {
      // offset?: number | undefined;
      // limit?: number | undefined;
      // timeout?: number | undefined;
      // allowed_updates?: string[] | undefined;
    },
  },
  filepath: false, // optimization if not reading files directly from fs
};

const initTelegramClient = async (options: TelegramClient.ConstructorOptions) => {
  try {
    const client = new TelegramClient(env.TELEGRAM_BOT_TOKEN, options);

    if (!client) throw new Error('Telegram client could not be loaded');

    return client;
  } catch (err) {
    console.error('Telegram module initialize error', err);
    return null;
  }
};

const createClient = async () => {
  try {
    const client = await initTelegramClient(tgInitOptions);
    await sleep(500);

    if (!client) throw new Error('Whatsapp client could not be loaded');

    return client;
  } catch (err) {
    console.error('Telegram module initialize error', err);
    return null;
  }
};

export default createClient;
