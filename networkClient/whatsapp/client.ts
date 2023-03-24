import env from 'env';
import processArgs from 'args';
import { Client as WhatsappClient, AuthStrategy } from 'whatsapp-web.js';

import { AuthenticationType } from 'config/adapter/whatsapp/auth';

// import db from 'src/lib/indexedDB.lib';

const getAuthStrategy = async (type: AuthenticationType) => {
  try {
    let authStrategy: AuthStrategy = null as never;

    switch (type) {
      case 'remote':
        authStrategy = await (await import('./authStrategy/remoteAuth')).default;
        break;
      case 'local':
        authStrategy = await (await import('./authStrategy/localAuth')).default;
        break;
      default:
        throw Error('(Create WhatsappAdapter): No valid authStrategy provided');
    }
    return authStrategy;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const initWhatsappClient = async (authStrategy: AuthStrategy) => {
  const client = new WhatsappClient({
    puppeteer: {
      executablePath: env.SYSTEM_CHROME_PATH,
      headless: true,
    },
    // ffmpegPath: '/path/to/ffmpeg.exe' // X-FIXME: TODO implement and test
    bypassCSP: true,
    authStrategy,
  } as any); // for bypass test
  await client.initialize();
  return client;
};

const createClient = async () => {
  const { authStrategy = 'local' } = processArgs;

  try {
    const strategy = await getAuthStrategy(authStrategy);

    if (!strategy) throw new Error('No whatsapp auth strategy');

    const client = initWhatsappClient(strategy);

    if (!client) throw new Error('Whatsapp client could not be loaded');

    return client;

    // await db; // X-TODO: implement or remove indexedDB usage
  } catch (err) {
    console.error('Whatsapp module initialize error', err);
    return null;
  }
};

// const client = (async () => {
//   const c = await createClient();
//   return c;
// })();

// const client = createClient();

// export default client;
export default createClient;
