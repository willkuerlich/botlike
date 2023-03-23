// import { service } from 'src/botlike/bot/default/state/machine';
// import { Typegen0 } from 'src/botlike/bot/default/state/machine.typegen';

// import { service } from 'src/botlike/bot/default/state/PromptMachine';
import { Typegen0 } from '../bot/default/state/PromptMachine.typegen';

import {
  AnyEventObject,
  BaseActionObject,
  Interpreter,
  ResolveTypegenMeta,
  ServiceMap,
} from 'xstate';

import {
  DiscordEventBindings,
  DiscordEventType,
} from 'src/app/networkClient/discord/types';
import {
  TelegramEventBindings,
  TelegramEventType,
} from 'src/app/networkClient/telegram/types';
import {
  WhatsappEventBindings,
  WhatsappEventType,
} from 'src/app/networkClient/whatsapp/types';

import { WhatsappClient } from 'src/types/whatsapp.types';
import { TelegramClient } from 'src/types/telegram.types';
import { DiscordClient } from 'src/types/discord.types';

export type BotlikeInitConfig = {
  name?: string;
};

export type PromptInterpreter = Interpreter<
  { foo: string },
  any,
  AnyEventObject,
  { value: any; context: { foo: string } },
  ResolveTypegenMeta<Typegen0, AnyEventObject, BaseActionObject, ServiceMap>
>;

export interface BotlikeConfig<TInterpreter extends PromptInterpreter> {
  // name?: string;
  // triggerSequence: string;
  // argsDelimiter?: string; // fallback to 1 space
  // promptDelimiter?: string; // fallback to 1 space
  // eventBindings: Partial<TAdapterBindings>;
  service: TInterpreter;
  // onDisconnect(): void;
  // start(): void;
  // stop(): void;
  // processTextPrompt(msg: string): void;
  // triggerSequences: TriggerSequenceDefinition[];
}

export interface BotlikeModuleConfig<
  // TAdapterBindings extends WhatsappEventBindings | TelegramEventBindings,
  // TAdapterBindings extends BaseEventBindings,
  // TInterpreter extends PromptInterpreter,
> {
  name?: string;
  triggerSequence: string;
  // argsDelimiter?: string; // fallback to 1 space
  // promptDelimiter?: string; // fallback to 1 space
  // eventBindings: Partial<TAdapterBindings>;
  // service: TInterpreter;
  // onDisconnect(): void;
  // start(): void;
  // stop(): void;
  // processTextPrompt(msg: string): void;
  // triggerSequences: TriggerSequenceDefinition[];
}

// we want something like "$action@--width 1024 -h 512 ...utterance"
// but also "Hey ...utterance" to be possible
export interface TriggerSequenceDefinition {
  id?: string;
  prefix?: string; // '$',
  actionKey: string; // action (fallback for opt id)
  argsDelimiter?: string; // '@'
  invokeEventId?: string; // testing
  // argsSchema: ts.argsSchema, // TODO
  argsOptionsParser?: () => {};
}

// (sequence + delimiters)-config array needed

////

export interface BotTask {
  id: string;
}

////

export type BotNetworkType = 'whatsapp' | 'telegram' | 'discord';

export type BotNetworkClient = DiscordClient | TelegramClient | WhatsappClient;

export interface BotNetworkModule<T extends BotNetworkClient = BotNetworkClient> {
  type: BotNetworkType;
  client: T;
  eventBindings?:
    | Partial<DiscordEventBindings>
    | Partial<TelegramEventBindings>
    | Partial<WhatsappEventBindings>;
  service: PromptInterpreter;
  botConfig: BotlikeModuleConfig;
}

////
export type DiscordEventHandler = (...args: any) => void; // X-FIXME: any
export type TelegramEventHandler = (...args: any) => void; // X-FIXME: any
export type WhatsappEventHandler = (...args: any) => void; // X-FIXME: any
export type BotNetworkEventHandler =
  | DiscordEventHandler
  | TelegramEventHandler
  | WhatsappEventHandler;

////
export type BotNetworkEventName =
  | DiscordEventType
  | TelegramEventType
  | WhatsappEventType;
