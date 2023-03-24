import { WhatsappMessage } from 'src/types/whatsapp.types';
import { messageRequestServices } from 'src/app/messageRequestServices';

import { BotlikeModuleConfig } from 'src/botlike/core/botlike.types';
import { CommandRequestData, SubmitMessageHandler } from 'src/commander/commander.types';

interface WhatsappRequestConfig {
  messageType: 'text' | 'image';
  botlikeConfig: BotlikeModuleConfig;
  waMessage: WhatsappMessage;
  submitMessageHandler: SubmitMessageHandler;
  data: any[]; // X-TODO
}

// X-TODO: create base/universal request or split into submodule factories

const composeWhatsappRequest = ({
  botlikeConfig,
  data: images,
  messageType,
  waMessage,
  submitMessageHandler,
}: WhatsappRequestConfig): CommandRequestData => ({
  commandInfo: {
    messageText: waMessage.body,
    messageType,
    commandTriggerPrefix: botlikeConfig.triggerSequence,
    data: [...images],
  },
  networkInfo: {
    networkType: 'whatsapp',
  },
  userInfo: {
    userUid: 'wa-dummy-uid', // X-TODO: convert
    networkUid: 'wa-dummy-network-uid', // X-TODO:
  },
  submitMessageHandler,
  services: messageRequestServices,
});

export const whatsappImageRequest = (
  botlikeConfig: BotlikeModuleConfig,
  waMessage: WhatsappMessage,
  submitMessageHandler: SubmitMessageHandler,
) => {
  const img = waMessage._data?.body;
  return composeWhatsappRequest({
    botlikeConfig,
    messageType: 'image',
    waMessage,
    submitMessageHandler,
    data: [img], // X-TODO: data normalization converter
  });
};

export const whatsappTextRequest = (
  botlikeConfig: BotlikeModuleConfig,
  waMessage: WhatsappMessage,
  submitMessageHandler: SubmitMessageHandler,
) =>
  composeWhatsappRequest({
    botlikeConfig,
    messageType: 'text',
    waMessage,
    submitMessageHandler,
    data: [],
  });
