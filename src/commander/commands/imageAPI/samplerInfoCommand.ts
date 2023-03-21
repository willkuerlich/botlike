import type { Command } from '@commander-js/extra-typings';

import { configureHelp } from 'src/commander/configureHelp';
import { listAvailableSamplers } from 'src/actions/image/imageServer/samplerList';

import { CommandRequestData } from 'src/commander/commander.types';
export const addSamplerInfoCommand = (
  program: Command<[], {}>,
  commandKey: string,
  commandRequestMetaData: CommandRequestData,
) => {
  const { submitMessageHandler: submitMessage } = commandRequestMetaData;

  program
    .command(`${commandKey}`)
    .summary('Sampler list')
    .description('Botlike Sampler list')
    .configureHelp(configureHelp)
    .action(async function (/* seedArg, options, command */) {
      // X-TODO: validation pipeline + service
      await listAvailableSamplers(/* seedArg, options, command, */ submitMessage);
    });
};
