import type { CreateCompletionRequest } from 'openai';
import type { UniversalActionResponse } from 'src/actions/actionResponsePayload';
import type { CommandValidationPipelineArgs } from 'src/middleware/commandValidationPipeline';

import type { BotNetworkType } from 'src/botlike/core/botlike.types';
import type {
  LocalImageCommand,
  LocalImageEditOptions,
  LocalImageOptions,
} from 'src/types/imageServer.types';

export interface UserMetaData {
  userId: string | undefined; // should be a general on consumable by wa/tg/discord
}

export interface MessageRequestServices {
  utility: {
    commandValidationService: ({
      onError,
      onSuccess,
      commandRequestData,
    }: CommandValidationPipelineArgs) => Promise<void>;
    //  generateMessageId
    //  logMessage
    //  validateMessageAction
  };
  // conversionServices: {};
  serverServices: {
    commandLogger: (command: CommandRequestData) => Promise<boolean>;
  };
  actionServices: {
    text: {
      completion: (msg: string, options?: CreateCompletionRequest) => Promise<string>;
    };
    image: {
      image2Image: (
        options: LocalImageEditOptions,
        command: LocalImageCommand,
        images: string[], // X-TODO: improve format?
      ) => Promise<UniversalActionResponse>;
      text2Image: (
        options: LocalImageOptions,
        command: LocalImageCommand,
      ) => Promise<UniversalActionResponse>;
    };
  };
}

export interface CommandInfo {
  messageType: 'text' | 'image';
  messageText: string | null;
  commandTriggerPrefix: string;
  data?: any[] | any; // dataInfo[]: {type+content+info}[] // like ActionResult
}

export interface NetworkInfo {
  networkType: BotNetworkType;
  // networkEventType: string;
}

export interface UserInfo {
  userUid: string;
  networkUid: string;
}

export type SubmitMessageHandler = (
  actionResponse: UniversalActionResponse,
) => void /* Promise<void> */;

// X-FIXME: remove one of both CommandRequestData/CreateCommandRequest:

// rename to actionRequestData etc (or rename everything in "command..."?)
export interface CommandRequestData {
  commandInfo: CommandInfo;
  networkInfo: NetworkInfo;
  userInfo: UserInfo;
  services: MessageRequestServices;
  submitMessageHandler: SubmitMessageHandler;
  // Consider implementing optional CBs: (or pass error state through ReplyCommandOptions?)
  // replyOnSuccess
  // replayOnError
}

export interface CreateCommandRequest {
  commandInfo: CommandInfo;
  networkInfo: NetworkInfo;
  userInfo: UserInfo;
  submitMessageHandler: SubmitMessageHandler;
  services: MessageRequestServices;
}
