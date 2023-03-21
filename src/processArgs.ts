import z from 'zod';

import {
  processArgsParser,
  processArgsLogger,
  processArgsSchema,
} from './lib/args.helper';

/////////////////////////////////////////////////////////////////////////////////////////
//// !! DO NOT DELETE OR MOVE THIS FILE WITHOUT UPDATING "paths" IN tsconfig.json !! ////
/////////////////////////////////////////////////////////////////////////////////////////

const getProcessArgs = () => {
  const argsParser = processArgsParser();

  argsParser.parse(process.argv);
  const args = argsParser.opts();

  if (args.debug) processArgsLogger(args as ProcessArgs);

  return processArgsSchema.parse(args);
};

export const processArgs = getProcessArgs();

export default processArgs;

export type ProcessArgs = z.infer<typeof processArgsSchema>;
