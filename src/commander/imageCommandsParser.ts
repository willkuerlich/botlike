import { addImageCommandsTo } from 'src/commander/commands/openai/imageCommands';
import { addImageCommandsTo as addImageCommandsToGer } from 'src/commander/commands/openai/imageCommandsGerman';

import mainProgram from './mainProgram';
import { configureOutput } from './configureOutput';

import type { CommandRequestData } from './commander.types';

export function imageCommandsParser(commandRequestData: CommandRequestData) {
  const main = mainProgram(
    configureOutput(commandRequestData.submitMessageHandler),
    commandRequestData,
  );

  addImageCommandsTo(main, commandRequestData);
  addImageCommandsToGer(main, commandRequestData);

  return main;
}
