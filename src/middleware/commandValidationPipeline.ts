import { CommandRequestData } from 'src/commander/commander.types';
import { middleWarePipeline, Middleware } from 'src/lib/middleware/middleware';

type CommandValidationContext = {
  commandRequestData: CommandRequestData;
  onError: (errMsg: string) => void;
};

const validationDebugMiddleware: Middleware<CommandValidationContext> = (
  { onError, commandRequestData },
  next,
) => {
  console.log('==> UserId: ', commandRequestData?.userInfo?.userUid);
  console.log('validateCtxMiddleware running commandRequestData: ', commandRequestData);

  next();
};

const validateCtxMiddleware: Middleware<CommandValidationContext> = (
  { onError, commandRequestData },
  next,
) => {
  if (!commandRequestData?.userInfo?.userUid) {
    const errMsg = 'validateCtxMiddleware: No userUid';
    console.error(errMsg);
    return onError(errMsg);
  }

  if (!commandRequestData?.userInfo?.networkUid) {
    const errMsg = 'validateCtxMiddleware: No networkUid';
    console.error(errMsg);
    return onError(errMsg);
  }

  // X-TODO: use zod schema here
  next();
};

const validateUserMiddleware: Middleware<CommandValidationContext> = (
  { onError, commandRequestData },
  next,
) => {
  // evaluate if bot is connected to authority server
  // decide what to do if "disconnected" (based on network config?)
  // retrieve userData if "connected"
  console.log('Dummy middleware 2 running');

  // do something with requestMeta
  if (false) {
    onError('This has an middleware 2 Error');
    return;
  }
  next();
};

const getUserDataMiddleware: Middleware<CommandValidationContext> = (
  { onError, commandRequestData },
  next,
) => {
  // load user profile + permissions + service settings + credits
  console.log('Dummy middleware 3 running');
  // do something with requestMeta
  if (false) {
    onError('This has an middleware 3 Error');
    return;
  }
  next();
};

export interface CommandValidationPipelineArgs {
  commandRequestData: CommandRequestData;
  onSuccess: () => Promise<void>;
  onError: (errMsg: string) => Promise<void>;
}

export const commandValidationPipeline = async ({
  onError,
  onSuccess,
  commandRequestData,
}: CommandValidationPipelineArgs) => {
  const pipeline = middleWarePipeline<CommandValidationContext>();
  pipeline.push(validationDebugMiddleware);
  pipeline.push(validateCtxMiddleware);
  pipeline.push(validateUserMiddleware);
  pipeline.push(getUserDataMiddleware);

  let hasError: string | null = null;

  const setError = (errMsg: string) => {
    hasError = errMsg;
  };

  await pipeline.execute({ commandRequestData, onError: setError });
  if (hasError) {
    return onError(hasError);
  }

  return onSuccess();
};
