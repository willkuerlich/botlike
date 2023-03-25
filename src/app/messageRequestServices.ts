import { commandValidationPipeline } from 'src/middleware/commandValidationPipeline';
import { getBaseTextCompletion } from 'src/lib/prompts/text';
import { txt2imgAction } from 'src/actions/image/imageServer/txt2img';

import type { MessageRequestServices } from 'src/commander/commander.types';
import { img2imgAction } from 'src/actions/image/imageServer/img2img';
import { commandLogger } from 'src/services/logger/commandLogger';

// import { formatImageInfo } from 'src/lib/image/formatImageInfo';

/**
 * Replace with ServiceCenter
 * @returns
 */
export const messageRequestServices = (): MessageRequestServices => {
  return {
    actionServices: {
      text: {
        completion: getBaseTextCompletion,
      },
      image: {
        text2Image: txt2imgAction,
        image2Image: img2imgAction,
      },
    },
    serverServices: {
      commandLogger,
    },
    utility: {
      commandValidationService: commandValidationPipeline,
    },
  };
};
