import type { Command } from '@commander-js/extra-typings';
import { configureHelp } from 'src/commander/configureHelp';

import { addImageEditCommand } from 'src/commander/commands/imageAPI/imageEditCommand';
import { addSamplerInfoCommand } from 'src/commander/commands/imageAPI/samplerInfoCommand';
import { addImageCreateCommand } from 'src/commander/commands/imageAPI/imageCreateCommand';

import { CommandRequestData } from 'src/commander/commander.types';
export const addImageCommandsTo = (
  program: Command<[], {}>,
  commandRequestMetaData: CommandRequestData,
) => {
  const image = program
    .command('image')
    .summary('Image commands')
    .description('Botlike image handling')
    .configureHelp(configureHelp);

  addImageCreateCommand(program, 'create', commandRequestMetaData);
  addImageCreateCommand(program, 'Create', commandRequestMetaData);

  // image
  //   .command('create <prompt>')
  //   .description('Create an image via prompt')
  //   .option(
  //     '-s, --seed <number>',
  //     `Seed # 0-infinity | -1 => random \n Default: 1`,
  //     // '-1',
  //     parseStringToInt,
  //   )
  //   .option(
  //     '-v, --variants <number>',
  //     `Variants # 1-5 \n Default: 1`,
  //     // '-1',
  //     parseStringToInt,
  //   )
  //   .option(
  //     '-q, --quality <number>',
  //     `Quality # 1-50 \n Default: 25`,
  //     // '-1',
  //     parseStringToInt,
  //   )
  //   .option(
  //     '-sa, --sampler <letters...>',
  //     `Sampler wählen \n Default: Euler a`,
  //     (val, prev: string) => parseStringToSampler(val, prev, callback),
  //   )
  //   .option('-t, --tiling', `Enable tiling mode`)
  //   .option('-i, --info', `Show image parameters`)
  //   .option('-nn, --nonegative', `Do not use negative prompt`)
  //   .action(async function (seedArg, options, command) {
  //     await txt2imgAction(seedArg, options, command, callback);
  //   });

  addSamplerInfoCommand(program, 'sampler', commandRequestMetaData);
  addSamplerInfoCommand(program, 'Sampler', commandRequestMetaData);

  addImageEditCommand(program, 'edit', commandRequestMetaData);
  addImageEditCommand(program, 'Edit', commandRequestMetaData);

  // image
  //   .command('edit <prompt>')
  //   .description('Edit an image via prompt')
  //   .option(
  //     '-s, --seed <number>',
  //     `Seed # 0-infinity | -1 => random \n Default: 1`,
  //     // '-1',
  //     parseStringToInt,
  //   )
  //   .option('-i, --info', `Show image parameters`)
  //   .option('-nn, --nonegative', `Do not use negative prompt`)
  //   .action(async function (seedArg, options, command) {
  //     await img2imgAction(seedArg, options, command, callback, images!);
  //   });

  // image
  //   .command('variation')
  //   .description('Create variations of an image')
  //   .option('-i, --info', `Show image parameters`)
  //   .option('-nn, --nonegative', `Do not use negative prompt`)
  //   .action(() => {
  //     console.log('action: image variation');
  //     callback('<action-not-implemented: image variation>');
  //   });
};
