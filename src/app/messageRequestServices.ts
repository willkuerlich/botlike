import { commandValidationPipeline } from 'src/app/middleware/commandValidationPipeline';
import { getBaseTextCompletion } from 'src/lib/prompts/text';
import { txt2imgAction } from 'src/actions/image/imageServer/txt2img';

import type { MessageRequestServices } from 'src/commander/commander.types';
import { img2imgAction } from 'src/actions/image/imageServer/img2img';

// import { formatImageInfo } from 'src/lib/image/formatImageInfo';

export const messageRequestServices: MessageRequestServices = {
  actionServices: {
    text: {
      completion: getBaseTextCompletion,
    },
    image: {
      text2Image: txt2imgAction,
      image2Image: img2imgAction,
    },
  },
  utility: {
    commandValidationService: commandValidationPipeline,
  },
};
