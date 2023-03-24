import { universalMessageHandler } from 'src/botlike/prompt/universalMessageHandler';
import { evaluateWhatsappUtilityCall } from './utilityCommands';
import { whatsappImageRequest, whatsappTextRequest } from './request';

import type { WhatsappClient, WhatsappMessage } from 'src/types/whatsapp.types';
import type { BotNetworkModule } from 'src/botlike/core/botlike.types';
import { whatsappMessageQueue } from './messageQueue';

// import { commandValidationPipeline } from 'src/app/middleware/commandValidationPipeline';

export const handleWhatsappPrompt = async (
  message: WhatsappMessage,
  { client, botConfig }: BotNetworkModule<WhatsappClient>,
  args?: {
    // messageMetaData: {}
  },
) => {
  const { isUtilityCall } = evaluateWhatsappUtilityCall(message);
  if (isUtilityCall) return; // or reply with a command confirmation privately

  const msgType = message.type;

  switch (msgType) {
    case 'chat':
      universalMessageHandler(
        whatsappTextRequest(
          botConfig,
          message,
          (actionResponse) => whatsappMessageQueue(client, message, actionResponse),
          /* pass validationPipeline as args */
        ),
      );
      break;
    case 'image':
      universalMessageHandler(
        whatsappImageRequest(
          botConfig,
          message,
          (actionResponse) => whatsappMessageQueue(client, message, actionResponse),
          /* pass validationPipeline as args */
        ),
      );
      break;
    // case 'list_response':
    //   console.log(`Option ${message.body} was selected!`);
    //   break;
    // case 'ptt':
    //   // await handleVoiceMessageCreate(msg);
    //   break;
    default:
      console.warn(`handleWhatsappPrompt(): Unknown message type "${msgType}"`);
      break;
  }
};
