import Botlike from 'src/botlike/core';
import { BotNetworkModule } from 'src/botlike/core/botlike.types';
import { displayQRTerminal } from 'src/lib/qr.lib';

import type { WhatsappClient, WhatsappMessage } from 'src/types/whatsapp.types';
import { handleWhatsappPrompt } from './messageHandler';
import type { WhatsappEventBindings } from './types';

export const whatsappEventBindings = (
  module: BotNetworkModule<WhatsappClient>,
): Partial<WhatsappEventBindings> => ({
  qr: displayQRTerminal,
  auth_failure: () => console.log('Authentication failure!'),
  authenticated: (/* session: ClientSession */) => console.log('Authentication success!'),
  ready: () => Botlike.instance.start('whatsapp'),
  disconnected: () => Botlike.instance.onDisconnect('whatsapp'),
  message_create: (msg: WhatsappMessage) => handleWhatsappPrompt(msg, module),
});
