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
  WhatsappEventBindings,
  WhatsappEventType,
} from 'src/app/networkClient/whatsapp/types';
import {
  TelegramEventBindings,
  TelegramEventType,
} from 'src/app/networkClient/telegram/types';
import { WhatsappClient } from 'src/types/whatsapp.types';
import { TelegramClient } from 'src/types/telegram.types';
// import { BaseEventBindings } from 'src/types/event.types';
// import Botlike from 'src/botlike/core';

export type BotlikeInitConfig = {
  // client?: WhatsappClient;
  name?: string /* ; reply: (msg: string) => void */;
};

export type PromptInterpreter = Interpreter<
  { foo: string },
  any,
  AnyEventObject,
  { value: any; context: { foo: string } },
  ResolveTypegenMeta<Typegen0, AnyEventObject, BaseActionObject, ServiceMap>
>;

export interface BotlikeConfig<
  // TAdapterBindings extends WhatsappEventBindings | TelegramEventBindings,
  // TAdapterBindings extends BaseEventBindings,
  TInterpreter extends PromptInterpreter,
> {
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
export type BotNetworkClient = WhatsappClient | TelegramClient; // | DiscordClient;

export interface BotNetworkModule<
  T extends WhatsappClient | TelegramClient = BotNetworkClient,
> {
  type: BotNetworkType;
  client: T;
  eventBindings?: Partial<WhatsappEventBindings> | Partial<TelegramEventBindings>;
  service: PromptInterpreter;
  botConfig: BotlikeModuleConfig;
  // X-TODO: implement + simplify if possible
  // botConfig: BotlikeModuleConfig<
  //   WhatsappEventBindings | TelegramEventBindings,
  //   PromptInterpreter
  // >;

  // botName: string;
  // triggerSequences: TriggerSequenceDefinition[];
  // eventBindings: WhatsappEventBindings = null as never;
  // service
}

////

export type WhatsappEventHandler = (...args: any) => void; // X-FIXME: any
export type TelegramEventHandler = (...args: any) => void; // X-FIXME: any
export type BotNetworkEventHandler =
  | WhatsappEventHandler
  | TelegramEventHandler /* | DiscordHandler */;

////
export type BotNetworkEventName = WhatsappEventType | TelegramEventType;

////
