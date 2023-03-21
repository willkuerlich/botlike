import type { Command } from '@commander-js/extra-typings';

import { configureHelp } from 'src/commander/configureHelp';

import { defaultCodexModel, CodexModelTypes } from 'config/api/openai/codex-models';
import { getBaseCodexCompletion } from 'src/lib/prompts/codex';

import { CommandRequestData } from 'src/commander/commander.types';
import { commanderCommandDebugger } from 'src/commander/commandDebugger';
import { baseTextResponse } from 'src/actions/actionResponsePayload';

export const addCodexCommandsTo = (
  program: Command<[], {}>,
  commandRequestMetaData: CommandRequestData,
) => {
  const { submitMessageHandler: submitMessage } = commandRequestMetaData;
  const codex = program
    .command('codex')
    .summary('Codex commands')
    .description('Botlike code handling')
    .configureHelp(configureHelp);

  codex
    .command('completion <text>')
    .description('Code operations')
    .option(
      '-m, --model <val>',
      `GPT3 Codex Model, one of: [ ${CodexModelTypes.map(
        (type) => `"${type}" `,
      )}]\n Default: "${defaultCodexModel}"`,
    )
    .action(async (arg1, options, command) => {
      commanderCommandDebugger(options, command, commandRequestMetaData);
      try {
        if (!command?.args?.length) {
          return command.helpInformation(); // not tested
        }
        const code = command.args.join(' ');
        console.log('code string after joining: ', code);
        // X-FIXME: validation pipeline + service
        const res = await getBaseCodexCompletion(code as string);
        submitMessage(baseTextResponse(res));
      } catch (e) {
        console.error('Codex completion error: ', e);
        submitMessage(baseTextResponse(`Codex completion error`));
      }
    });
};
