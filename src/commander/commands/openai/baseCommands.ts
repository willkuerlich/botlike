// import processArgs from 'args';
import type { Command } from '@commander-js/extra-typings';
import type { CreateCompletionRequest } from 'openai';

import { gpt3TextModelTypes } from 'config/api/openai/gpt3.5-text-models';
import { configureHelp } from 'src/commander/configureHelp';
// import { commanderCommandDebugger } from 'src/commander/commandDebugger';

import type { CommandRequestData } from 'src/commander/commander.types';
import { validateAndHandleRequest } from '../../validateActionRequest';
import { debugRequest } from 'src/commander/debugActionRequest';
import { baseTextResponse } from 'src/actions/actionResponsePayload';

export const addBaseCommandsTo = (
  program: Command<[], {}>,
  commandRequestData: CommandRequestData,
) => {
  /* const text =  */ program
    .command('? <text>')
    .summary('Quick question')
    .description('Ask Botlike a question')
    .configureHelp(configureHelp)
    .option(
      '-m, --model <val>',
      `GPT3 Text Model, one of: [ ${gpt3TextModelTypes.map(
        (type) => `"${type}" `,
      )}]\n Default: "text-davinci-003"`,
    )
    .action(async (arg1, options, command) => {
      try {
        debugRequest({ command, commandRequestData, options });
        await validateAndHandleRequest({
          commandRequestData,
          onSuccess: async () => {
            const prompt = command.args.join(' ') || '';
            const reqOptions: CreateCompletionRequest | undefined = undefined;
            const res = await commandRequestData.services.actionServices.text.completion(
              prompt,
              reqOptions,
            );
            await commandRequestData.submitMessageHandler(baseTextResponse(res));
          },
        });
      } catch (e) {
        console.error('Text completion error: ', e);
        commandRequestData.submitMessageHandler(
          baseTextResponse(`Text completion error`),
        );
      }
    });

  // text
  //   .command('completion <text>')
  //   .description('Complete a text')
  //   .option(
  //     '-m, --model <val>',
  //     `GPT3 Text Model, one of: [ ${gpt3TextModelTypes.map(
  //       (type) => `"${type}" `,
  //     )}]\n Default: "text-davinci-003"`,
  //   )
  //   .action(async (arg1, options, command) => {
  //     console.log('action: text create');
  //     console.log('action: text create name: ', arg1); // similar to command.processedArgs
  //     console.log('action: text create options: ', options);
  //     console.log(
  //       'action: text create command - parent commands',
  //       command.parent?.commands.map((c) => c.name()),
  //     );
  //     // console.log('action: text create command.args', command.args);
  //     // console.log('action: text create command.processedArgs', command.processedArgs); // only the first successor arg
  //     // console.log('action: text create command name: ', command.name());
  //     try {
  //       if (!command?.args?.length) {
  //         return command.helpInformation(); // not tested
  //       }
  //       const res = await getBaseTextCompletion(command.args.join(' ') as string);
  //       callback(res);
  //     } catch (e) {
  //       console.error('Text completion error: ', e);
  //       callback(`Text completion error`);
  //     }
  //   });
  // .hook('postAction', async (thisCommand, actionCommand) => {
  //   console.log('text completion post action');
  //   return;
  //   // if (thisCommand.opts().trace) {
  //   //   console.log(`About to call action handler for subcommand: ${actionCommand.name()}`);
  //   //   console.log('arguments: %O', actionCommand.args);
  //   //   console.log('options: %o', actionCommand.opts());
  //   // }
  // });

  // text
  //   .command('edit <text>')
  //   .description('Edit a text')
  //   .action(() => {
  //     console.log('action: text edit');
  //     callback('<action-not-implemented: text edit>');
  //   });

  // text
  //   .command('embedding <text>')
  //   .description('Create a text embedding')
  //   .action(() => {
  //     console.log('action: text variation');
  //     callback('<action-not-implemented: text variation>');
  //   });
};
