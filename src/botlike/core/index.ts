// import type { ProcessArgs } from 'args';
import env from 'env';

import {
  BotlikeConfig,
  // BotlikeInitConfig,
  // BotNetworkEventHandler,
  // BotNetworkEventName,
  BotNetworkModule,
  BotNetworkType,
  BotTask,
  // WhatsappEventHandler,
  // TelegramEventHandler,
  // PromptInterpreter,
  // TriggerSequenceDefinition,
} from 'src/botlike/core/botlike.types';

// import { service as testService } from 'src/botlike/bot/test/state/machine';
import { service as promptService } from 'src/botlike/bot/default/state/PromptMachine';
// import { testBot } from 'src/botlike/bot/test';
// import { BaseEventBindings } from 'src/types/event.types';
// import { Interpreter, ServiceConfig } from 'xstate';

import { registerNetworkEventHandlers } from './registerNetworkEventHandlers';
import { timelogFormat } from 'src/lib/log.lib';
import getSupabaseClient, { SupabaseClient } from 'modules/supabase/supabaseClient';

const isTranslationOn = false; // X-TODO: .env / args

/** Bot is singleton pattern (use Botlike.instance) */
export class Botlike
  implements
    BotlikeConfig<
      // BaseEventBindings,
      /* WhatsappEventBindings & TelegramEventBindings, */
      typeof promptService
    >
{
  static instance: Botlike = null as never;
  // X-TODO: replace with generic module system
  supabaseClient: SupabaseClient | null = null;
  // systemModules: BotSystemModule[] = [];

  networkModules: BotNetworkModule[] = [];
  // call this inside of constructor?
  public registerNetworkModule(networkModule: BotNetworkModule) {
    if (networkModule.eventBindings) {
      console.info(
        `${timelogFormat(new Date())} - Start registering of "${
          networkModule.type
        }" event bindings`,
      );
      registerNetworkEventHandlers(networkModule);
    }
    this.networkModules.push(networkModule); // TODO: add moduleIsReady flag = true
    console.info(
      `${timelogFormat(new Date())} - All "${
        networkModule.type
      }" events bindings have been registered`,
    );
  }

  // name: string = null as never;
  // triggerSequence: string = null as never;
  // triggerSequences: TriggerSequenceDefinition[] = [];

  state: Record<string, any> = {};
  service: typeof promptService /* | typeof testService */ = null as never; // X-TODO

  taskQueue: BotTask[] = [];
  // actionDictionary: Record<string, string> = {};

  constructor(/* processArgs: ProcessArgs */) {
    // const { /* adapter, */ debug, mode = 'default' } = processArgs;

    // if (debug) console.log(`Botlike Bot is starting in mode "${mode}"...`);

    if (Botlike.instance) {
      console.log('Botlike.instance already setup: ', Botlike.instance);
      return Botlike.instance;
    } else {
      // X-TODO: replace with system module loader mechanism
      if (env.USE_MODULE_SUPABASE) this.supabaseClient = getSupabaseClient();

      Botlike.instance = this;

      // this.name = args?.name || this.name || 'John Doe Bot';
    }
    // service.start();
  }

  // helper for testing
  public dispose = () => {
    Botlike.instance = null as never;
  };

  public onDisconnect = (type: BotNetworkType) => console.log(`${type} disconnected`);

  public start = (networkType: BotNetworkType) => {
    // if module is available && everything else is ready

    if (networkType === 'whatsapp') {
      const mod = this.networkModules.find((m) => m.type === networkType);
      if (!mod) {
        throw new Error('No whatsapp module');
      }
      console.log('Starting whatsapp module');
      mod.service.start();
    }
  };

  public stop = (networkType: BotNetworkType) => {
    // if module is available && everything else is ready

    if (networkType === 'whatsapp') {
      const mod = this.networkModules.find((m) => m.type === networkType);
      if (!mod) {
        throw new Error('No whatsapp module');
      }
      mod.service.stop();
    }
  };

  public toggle() {
    this.service.send('PROMPT', { foo: 'toggle-bar', query: 'query' });
    // service.send('TOGGLE');
  }

  private addTask(task: BotTask) {
    this.taskQueue.push(task);
  }
}

export default Botlike;
