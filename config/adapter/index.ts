import { BotNetworkType } from 'src/botlike/core/botlike.types';

/** Adapter registration, since no bot-network or sync is planned,
 *  a new bot process must be spawned for each network
 **/
export const adapterTypes = ['whatsapp' /* , 'telegram' */] as const; // RENAME

export type AdapterType = (typeof adapterTypes)[number];

export const registerNetworks: BotNetworkType[] = [
  'discord',
  'telegram' /* , 'whatsapp' */,
]; // make type const?
