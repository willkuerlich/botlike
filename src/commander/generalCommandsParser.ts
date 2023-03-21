import { addCodexCommandsTo } from 'src/commander/commands/openai/codexCommands';
import { addImageCommandsTo } from 'src/commander/commands/openai/imageCommands';
import { addImageCommandsTo as addImageCommandsToGer } from 'src/commander/commands/openai/imageCommandsGerman';
import { addTextCommandsTo } from 'src/commander/commands/openai/textCommands';
import { addBaseCommandsTo } from 'src/commander/commands/openai/baseCommands';
// import { addTestCommandsTo } from 'src/commander/commands/examples/testCommands';

import mainProgram from './mainProgram';
import { configureOutput } from './configureOutput';
import type { CommandRequestData } from './commander.types';

export function generalCommandsParser(requestMeta: CommandRequestData) {
  const main = mainProgram(
    configureOutput(requestMeta.submitMessageHandler),
    requestMeta,
  );

  addBaseCommandsTo(main, requestMeta);
  addImageCommandsTo(main, requestMeta);
  addImageCommandsToGer(main, requestMeta); // X-FIXME: i18n handling
  addTextCommandsTo(main, requestMeta);
  addCodexCommandsTo(main, requestMeta);

  // addTestCommandsTo(program, cb, message);

  return main;
}
