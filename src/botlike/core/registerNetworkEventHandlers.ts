import {
  BotNetworkEventHandler,
  BotNetworkEventName,
  BotNetworkModule,
  BotNetworkClient,
} from './botlike.types';

export const registerNetworkEventHandlers = (networkModule: BotNetworkModule) => {
  if (!networkModule.eventBindings) return;
  Object.entries(networkModule.eventBindings).forEach(([key, val]) => {
    const event = key as BotNetworkEventName; // X-TODO: validate passed keys against module model definition
    const listener = val as BotNetworkEventHandler;
    const client = networkModule.client as BotNetworkClient;
    client.addListener(event as any, listener); // X-TODO: depends on BotNetworkModule type

    // // @ts-ignore
    // client.on(event as any, listener);

    //////////////////////

    // Type-safety is unnecessary here:

    // switch (networkModule.type) {
    //   case 'telegram':
    //     {
    //       const event = key as TelegramEventType;
    //       const listener = val as TelegramEventHandler;
    //       const client = networkModule.client as TelegramClient;
    //       client.addListener(event as any, listener);
    //     }
    //     break;
    //   case 'whatsapp':
    //     {
    //       const event = key as WhatsappEventType;
    //       const listener = val as WhatsappEventHandler;
    //       const client = networkModule.client as WhatsappClient;
    //       client.addListener(event, listener);
    //     }
    //     break;
    //   default:
    //     throw new Error(`No network registration config for "${networkModule.type}"`);
    // }
  });
};
