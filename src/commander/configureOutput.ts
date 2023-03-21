import { baseTextResponse } from 'src/actions/actionResponsePayload';
import { SubmitMessageHandler } from './commander.types';

export const configureOutput = (cb: SubmitMessageHandler) => ({
  writeOut: (str: string) => cb(baseTextResponse(str)),
  writeErr: (str: string) => cb(baseTextResponse(str)),
  outputError: (str: string /* , write */) => cb(baseTextResponse(str)),
  // getOutHelpWidth()
  // getErrHelpWidth()
});
