import processArgs from 'args';
import type { Command } from '@commander-js/extra-typings';

import { normalizeCommand } from 'src/commander/normalizeCommand';
import { generalCommandsParser } from 'src/commander/generalCommandsParser';
import { imageCommandsParser } from 'src/commander/imageCommandsParser';

import type { CommandRequestData } from 'src/commander/commander.types';
import { baseTextResponse } from 'src/actions/actionResponsePayload';

export const universalMessageHandler = async (commandRequestData: CommandRequestData) => {
  try {
    const { commandTriggerPrefix, messageText, messageType } =
      commandRequestData.commandInfo;

    const hasMessageValidPrefix = !!(
      messageText &&
      (!commandTriggerPrefix ||
        (commandTriggerPrefix && messageText.startsWith(commandTriggerPrefix)))
    );

    if (!hasMessageValidPrefix) return;

    let parser: Command<[], {}> | null = null;

    switch (messageType) {
      case 'text':
        parser = generalCommandsParser(commandRequestData);
        break;
      case 'image':
        parser = imageCommandsParser(commandRequestData);
        break;
      default:
        throw new Error(
          `universalMessageHandler(): messageType "${messageType}" is not supported`,
        );
    }

    const { command } = normalizeCommand(messageText, commandTriggerPrefix || '');

    if (processArgs.debug /* || processArgs.introspect */)
      commandRequestData.submitMessageHandler(
        baseTextResponse(`Received your command: ${command}`),
      );

    await parser.parseAsync(command.split(' '), { from: 'user' });
    // parser.parse(command.split(' '), { from: 'user' });

    //// DEBUGGING COMMAND ARGS/OPTIONS:

    // const opts = parser.opts();
    // const argsGlob = parser.optsWithGlobals;

    // console.log('parseActionMessage sync opts: ', opts);
    // console.log('parseActionMessage sync optsWithGlobals: ', argsGlob());
    // console.log('Remaining arguments - parser.args: ', parser.args); // all args

    // if (processArgs.debug) basePromptArgsLogger(args as BasePromptArgs);
    // return basePromptArgsSchema.parse(args);
    // return `your message args:\n${JSON.stringify(opts, null, '\n  ')}`;
    // callback(`Received your message, args:\n${JSON.stringify(opts, null, '\n  ')}`);
  } catch (e) {
    const err = e as any;
    console.error(`[universalMessageHandler()] Error:`, err.code || err.toString());
  }
};
