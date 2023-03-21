import type { Command } from '@commander-js/extra-typings';
import { CommandRequestData } from './commander.types';

export const commanderCommandDebugger = (
  // arg1: string,
  options: Record<string, unknown>,
  command: Command<[string], {}>,
  commandRequestMetaData: CommandRequestData,
) => {
  console.log('---------------------------------');
  // console.log('action: text create');
  console.log('action: text create command: ', command); // similar to command.processedArgs
  console.log('action: text create options: ', options);
  console.log(
    'action: text create command - parent commands',
    command.parent?.commands.map((c) => c.name()),
  );
  console.log('action: text create command.args', command.args);
  console.log('action: text create command.processedArgs', command.processedArgs); // only the first successor arg
  console.log('action: text create command name: ', command.name());

  console.log('---------------------------------');
  console.log(commandRequestMetaData);
  console.log('---------------------------------');
};
