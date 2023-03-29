import DiscordJS from 'discord.js';

import { messageRequestServices } from 'src/app/messageRequestServices';

import { BotlikeModuleConfig } from 'src/botlike/core/botlike.types';
import { CommandRequestData, SubmitMessageHandler } from 'src/commander/commander.types';

type DiscordMessage = DiscordJS.Message;

interface DiscordRequestConfig {
  messageType: 'text' | 'image';
  botlikeConfig: BotlikeModuleConfig;
  dcMessage: DiscordMessage; // X-TODO: rename in "message" and extends from base RequestConfig interface?
  submitMessageHandler: SubmitMessageHandler;
  data: any[]; // X-TODO
}

// X-TODO: create base/universal request or split into submodule factories

const composeDiscordRequest = ({
  botlikeConfig,
  data: images,
  messageType,
  dcMessage,
  submitMessageHandler,
}: DiscordRequestConfig): CommandRequestData => ({
  commandInfo: {
    messageText: dcMessage.content || '',
    messageType,
    commandTriggerPrefix: botlikeConfig.triggerSequence,
    data: [...images],
  },
  networkInfo: {
    networkType: 'discord',
  },
  userInfo: {
    userUid: 'dc-dummy-uid', // X-TODO: convert
    networkUid: 'dc-dummy-network-uid', // X-TODO:
  },
  submitMessageHandler,
  services: messageRequestServices(),
});

export const discordImageRequest = (
  botlikeConfig: BotlikeModuleConfig,
  dcMessage: DiscordMessage,
  submitMessageHandler: SubmitMessageHandler,
) => {
  // const img = tgMessage._data?.body;
  const img = dcMessage.attachments.first(); // X-TODO: test this
  // console.log('telegramImageRequest: img: ', img);
  return composeDiscordRequest({
    botlikeConfig,
    messageType: 'image',
    dcMessage,
    submitMessageHandler,
    data: [img], // X-TODO: data normalization converter
  });
};

export const discordTextRequest = (
  botlikeConfig: BotlikeModuleConfig,
  dcMessage: DiscordMessage,
  submitMessageHandler: SubmitMessageHandler,
) =>
  composeDiscordRequest({
    botlikeConfig,
    messageType: 'text',
    dcMessage,
    submitMessageHandler,
    data: [],
  });
