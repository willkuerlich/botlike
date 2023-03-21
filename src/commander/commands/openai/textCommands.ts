import type { Command } from '@commander-js/extra-typings';

import { configureHelp } from 'src/commander/configureHelp';

import { gpt3TextModelTypes } from 'config/api/openai/gpt3.5-text-models';
import { getBaseTextCompletion } from 'src/lib/prompts/text';

import { CommandRequestData } from 'src/commander/commander.types';
import { commanderCommandDebugger } from 'src/commander/commandDebugger';
import { baseTextResponse } from 'src/actions/actionResponsePayload';

export const addTextCommandsTo = (
  program: Command<[], {}>,
  commandRequestData: CommandRequestData,
) => {
  const { services, submitMessageHandler: submitMessage } = commandRequestData;
  const text = program
    .command('text')
    .summary('Text commands')
    .description('Botlike text handling')
    .configureHelp(configureHelp);

  text
    .command('completion <text>')
    .description('Complete a text')
    .option(
      '-m, --model <val>',
      `GPT3 Text Model, one of: [ ${gpt3TextModelTypes.map(
        (type) => `"${type}" `,
      )}]\n Default: "text-davinci-003"`,
    )
    .action(async (arg1, options, command) => {
      console.log('action: text create');
      commanderCommandDebugger(options, command, commandRequestData);
      try {
        if (!command?.args?.length) {
          return command.helpInformation(); // not tested
        }
        // X-FIXME: use validator + service
        const res = await getBaseTextCompletion(command.args.join(' ') as string);
        submitMessage(baseTextResponse(res)); // or return
      } catch (e) {
        console.error('Text completion error: ', e);
        submitMessage(baseTextResponse(`Text completion error`)); // or return
      }
    });
  // .hook('postAction', async (thisCommand, actionCommand) => {
  //   console.log('text completion post action');
  //   return;
  //   // if (thisCommand.opts().trace) {
  //   //   console.log(`About to call action handler for subcommand: ${actionCommand.name()}`);
  //   //   console.log('arguments: %O', actionCommand.args);
  //   //   console.log('options: %o', actionCommand.opts());
  //   // }
  // });

  text
    .command('edit <text>')
    .description('Edit a text')
    .action(() => {
      console.log('action: text edit');
      submitMessage(baseTextResponse('<action-not-implemented: text edit>'));
    });

  text
    .command('embedding <text>')
    .description('Create a text embedding')
    .action(() => {
      console.log('action: text variation');
      submitMessage(baseTextResponse('<action-not-implemented: text variation>'));
    });
};
