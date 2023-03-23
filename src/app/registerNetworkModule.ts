import type { BotNetworkModule, BotNetworkType } from 'src/botlike/core/botlike.types';
export const registerNetworkModule = async (networkType: BotNetworkType) => {
  let loadModule: Promise<BotNetworkModule> | null = null;
  switch (networkType) {
    case 'discord':
      loadModule = (await import(`./networkClient/discord/module`)).default();
      break;
    case 'telegram':
      loadModule = (await import(`./networkClient/telegram/module`)).default();
      break;
    case 'whatsapp':
      loadModule = (await import(`./networkClient/whatsapp/module`)).default();
      break;
    default:
      throw new Error(`NetworkModule registration for ${networkType} is not implemented`);
  }

  if (!loadModule) {
    throw new Error(`Module "${networkType}" loading error`);
  }

  return loadModule;

  // X-TODO: (Opt) Find way to tag those chunks as required
  // => (create registry for chunk names + preload or create separate runner which modifies this file)

  // (async () => {
  //   (await import(`./adapter/${adapter}`)).default;
  // })();
};
