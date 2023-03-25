import TelegramBot from 'node-telegram-bot-api';

import { messageRequestServices } from 'src/app/messageRequestServices';

import { BotlikeModuleConfig } from 'src/botlike/core/botlike.types';
import { CommandRequestData, SubmitMessageHandler } from 'src/commander/commander.types';

type TelegramMessage = TelegramBot.Message;

interface TelegramRequestConfig {
  messageType: 'text' | 'image';
  botlikeConfig: BotlikeModuleConfig;
  tgMessage: TelegramMessage;
  submitMessageHandler: SubmitMessageHandler;
  data: any[]; // X-TODO
}

// X-TODO: create base/universal request or split into submodule factories

const composeTelegramRequest = ({
  botlikeConfig,
  data: images,
  messageType,
  tgMessage,
  submitMessageHandler,
}: TelegramRequestConfig): CommandRequestData => ({
  commandInfo: {
    messageText: tgMessage.text || '',
    messageType,
    commandTriggerPrefix: botlikeConfig.triggerSequence,
    data: [...images],
  },
  networkInfo: {
    networkType: 'telegram',
  },
  userInfo: {
    userUid: 'tg-dummy-uid', // X-TODO: convert
    networkUid: 'tg-dummy-network-uid', // X-TODO:
  },
  submitMessageHandler,
  services: messageRequestServices(),
});

export const telegramImageRequest = (
  botlikeConfig: BotlikeModuleConfig,
  tgMessage: TelegramMessage,
  submitMessageHandler: SubmitMessageHandler,
) => {
  // const img = tgMessage._data?.body;
  const img = tgMessage.photo; // X-TODO: test this
  // console.log('telegramImageRequest: img: ', img);
  return composeTelegramRequest({
    botlikeConfig,
    messageType: 'image',
    tgMessage,
    submitMessageHandler,
    data: [img], // X-TODO: data normalization converter
  });
};

export const telegramTextRequest = (
  botlikeConfig: BotlikeModuleConfig,
  tgMessage: TelegramMessage,
  submitMessageHandler: SubmitMessageHandler,
) =>
  composeTelegramRequest({
    botlikeConfig,
    messageType: 'text',
    tgMessage,
    submitMessageHandler,
    data: [],
  });
