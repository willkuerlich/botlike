import type { ClientSession } from 'whatsapp-web.js';

import { whatsappEvents } from './events';

import type { BaseEventBindings } from 'src/types/event.types';
import type { WhatsappClient, WhatsappMessage } from 'src/types/whatsapp.types';

export type WhatsappEventType = (typeof whatsappEvents)[number];

// X-TODO: remove/replace
export interface WhatsappEventBindings extends BaseEventBindings {
  qr: (qr: string) => void;
  auth_failure: () => void;
  authenticated: (session: ClientSession) => void; // X-TODO: session is undefined here...
  ready: () => void;
  disconnected: () => void;
  message_create: (msg: any) => void;
}

// X-TODO: any args
// export interface WhatsappEventHandler
//   extends BaseEventBindings,
//     Record<WhatsappEventType, (args?: any) => void> {
//   [k: string]: (args?: any) => void;
// }

// export type WhatsappEventType =
//   | 'auth_failure'
//   | 'authenticated'
//   | 'change_battery'
//   | 'change_state'
//   | 'disconnected'
//   | 'group_join'
//   | 'group_leave'
//   | 'group_update'
//   | 'media_uploaded'
//   | 'message'
//   | 'message_ack'
//   | 'message_create'
//   | 'message_revoke_everyone'
//   | 'message_revoke_me'
//   | 'message_reaction'
//   | 'loading_screen'
//   | 'qr'
//   | 'call'
//   | 'ready'
//   | 'remote_session_saved'; // if using remoteAuthStrategy > this the safe point to use it onwards

export interface WhatsappResponseData {
  message: WhatsappMessage;
  client: WhatsappClient;
}
