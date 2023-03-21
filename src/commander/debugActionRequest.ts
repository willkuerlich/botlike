import processArgs from 'args';
import type { Command } from '@commander-js/extra-typings';

import { commanderCommandDebugger } from 'src/commander/commandDebugger';
import type { CommandRequestData } from 'src/commander/commander.types';

interface DebugRequestArgs {
  options: Record<string, unknown>;
  command: Command<[string], {}>;
  commandRequestData: CommandRequestData;
}

export const debugRequest = ({
  command,
  commandRequestData,
  options,
}: DebugRequestArgs) => {
  // if (!command?.args?.length) {
  //   return command.helpInformation(); // not tested
  // }

  if (processArgs.debug) {
    commanderCommandDebugger(options, command, commandRequestData);
  }

  commanderCommandDebugger(options, command, commandRequestData);
};
