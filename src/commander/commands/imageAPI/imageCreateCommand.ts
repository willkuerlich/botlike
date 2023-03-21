import type { Command } from '@commander-js/extra-typings';

import { configureHelp } from 'src/commander/configureHelp';
import {
  parseStringToInt,
  parseStringToSamplerIndex,
} from 'src/lib/commander/parse-string';

import type { CommandRequestData } from 'src/commander/commander.types';
import { validateAndHandleRequest } from 'src/commander/validateActionRequest';
import { debugRequest } from 'src/commander/debugActionRequest';

export const addImageCreateCommand = (
  program: Command<[], {}>,
  commandKey: string,
  commandRequestData: CommandRequestData,
) => {
  const { services, submitMessageHandler: submitMessage } = commandRequestData;

  const image = program
    .command(`${commandKey} <prompt>`)
    .summary('Bild Funktionen')
    .description('Botlike Bilderstellung')
    .option(
      '-s, --seed <number>',
      `Seed # 0-infinity | -1 => random \n Default: -1`,
      // '-1',
      (val, prev: number) => parseStringToInt(val, prev, submitMessage),
    )
    .option(
      '-v, --variants <number>',
      `Variants # 1-5 \n Default: 1`,
      // '-1',
      (val, prev: number) => parseStringToInt(val, prev, submitMessage),
    )
    .option(
      '-q, --quality <number>',
      `Quality # 1-50 \n Default: 25`,
      // '-1',
      (val, prev: number) => parseStringToInt(val, prev, submitMessage),
    )
    .option(
      '-sa, --sampler <number>',
      `Sampler Nummer auswählen\n Default: 0 (Euler a)\nBefehl für die Samplerliste: !sampler`,
      (val, prev: number) => parseStringToSamplerIndex(val, prev, submitMessage),
    )
    .option(
      '-is, --imgScale <number>',
      `imgScale \n Default: 0.85`,
      (val, prev: number) => parseStringToInt(val, prev, submitMessage),
    )
    .option('-t, --tiling', `Kachelmodus aktivieren`)
    .option('-i, --info', `Bild Infos anzeigen`)
    .option('-nn, --nonegative', `Bild ohne negativ Filter erstellen`)
    .configureHelp(configureHelp)
    .action(async function (arg1, options, command) {
      debugRequest({ command, commandRequestData, options });
      await validateAndHandleRequest({
        commandRequestData,
        onSuccess: async () => {
          const res = await services.actionServices.image.text2Image(options, command);
          await submitMessage(res);
        },
      });
    });
};
