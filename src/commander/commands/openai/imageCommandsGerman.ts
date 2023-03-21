import type { Command } from '@commander-js/extra-typings';

import { addImageCreateCommand } from 'src/commander/commands/imageAPI/imageCreateCommand';
import { addSamplerInfoCommand } from 'src/commander/commands/imageAPI/samplerInfoCommand';
import { addImageEditCommand } from 'src/commander/commands/imageAPI/imageEditCommand';

import type { CommandRequestData } from 'src/commander/commander.types';

export const addImageCommandsTo = (
  program: Command<[], {}>,
  commandRequestMetaData: CommandRequestData,
) => {
  addImageCreateCommand(program, 'bild', commandRequestMetaData);
  addImageCreateCommand(program, 'Bild', commandRequestMetaData);

  addSamplerInfoCommand(program, 'sampler', commandRequestMetaData);
  addSamplerInfoCommand(program, 'Sampler', commandRequestMetaData);

  addImageEditCommand(program, 'edit', commandRequestMetaData);
  addImageEditCommand(program, 'Edit', commandRequestMetaData);
};
