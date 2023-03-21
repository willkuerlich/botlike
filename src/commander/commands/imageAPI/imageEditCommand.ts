import type { Command } from '@commander-js/extra-typings';

import { configureHelp } from 'src/commander/configureHelp';
import {
  parseStringToInt,
  parseStringToSamplerIndex,
} from 'src/lib/commander/parse-string';

import type { CommandRequestData } from 'src/commander/commander.types';
import { debugRequest } from 'src/commander/debugActionRequest';
import { validateAndHandleRequest } from 'src/commander/validateActionRequest';

export const addImageEditCommand = (
  program: Command<[], {}>,
  commandKey: string,
  commandRequestData: CommandRequestData,
) => {
  const {
    commandInfo,
    services,
    submitMessageHandler: submitMessage,
  } = commandRequestData;
  const { data } = commandInfo; // X-TODO: improve data design
  program
    .command(`${commandKey} <prompt>`)
    .summary('Bild Bearbeiten')
    .description('Botlike Bilderbearbeitung')
    .option(
      '-s, --seed <number>',
      `Seed # 0-infinity | -1 => random \n Default: 1\n`,
      (val, prev: number) => parseStringToInt(val, prev, submitMessage),
      // '-1',
    )
    .option(
      '-v, --variants <number>',
      `Variants # 1-5 \n Default: 1\n`,
      (val, prev: number) => parseStringToInt(val, prev, submitMessage),
    )
    .option(
      '-q, --quality <number>',
      `Quality # 1-50 \n Default: 25\n`,
      (val, prev: number) => parseStringToInt(val, prev, submitMessage),
      // '25',
    )
    .option(
      '-sa, --sampler <number>',
      `Sampler Nummer auswählen\n Default: 0 (Euler a)\nBefehl für die Samplerliste: !sampler\n`,
      (val, prev: number) => parseStringToSamplerIndex(val, prev, submitMessage),
    )
    .option(
      '-dn, --denoising strength <number>',
      `denoising \n Default: 0.6\n`,
      (val, prev: number) => parseStringToInt(val, prev, submitMessage),
    )
    .option(
      '-in, --initNoise <number>',
      `initial noise multiplier \n Default: 0.85\n`,
      (val, prev: number) => parseStringToInt(val, prev, submitMessage),
    )
    .option(
      '-is, --imgScale <number>',
      `imgScale \n Default: 0.85\n`,
      (val, prev: number) => parseStringToInt(val, prev, submitMessage),
    )
    .option(
      '-ics, --imgCfgScale <number>',
      `imgCfgScale \n Default: 0.85\n`,
      (val, prev: number) => parseStringToInt(val, prev, submitMessage),
    )
    .option('-t, --tiling', `Kachelmodus aktivieren\n`)
    .option('-i, --info', `Show image parameters\n`)
    .option('-nn, --nonegative', `Do not use negative prompt\n`)
    .configureHelp(configureHelp)
    .action(async function (arg0, options, command) {
      debugRequest({ command, commandRequestData, options });
      await validateAndHandleRequest({
        commandRequestData,
        onSuccess: async () => {
          const res = await services.actionServices.image.image2Image(
            options,
            command,
            data!,
          );
          await commandRequestData.submitMessageHandler(res);
        },
      });
    });
};
