import type { WhatsappClient } from 'src/types/whatsapp.types';
import type { TelegramClient } from 'src/types/telegram.types';
import type { BotNetworkType } from 'src/botlike/core/botlike.types';

export const loadNetworkClient = async <T extends TelegramClient | WhatsappClient>(
  networkType: BotNetworkType,
) => {
  try {
    let client: T | null = null;
    switch (networkType) {
      case 'telegram':
        client = (await (
          await import(`src/app/networkClient/telegram/client`)
        ).default()) as T;
        break;
      case 'whatsapp':
        client = (await (
          await import(`src/app/networkClient/whatsapp/client`)
        ).default()) as T;
        break;
      default:
        console.error(`No module for networkType ${networkType} found`);
        throw new Error(`No module for networkType ${networkType} found`);
    }
    if (!client) throw new Error(`${networkType} network client could not be loaded`);
    return client;
  } catch (err) {
    console.error(err);
  }
};
