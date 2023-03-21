import { baseTextResponse } from 'src/actions/actionResponsePayload';
import type { CommandRequestData } from 'src/commander/commander.types';

interface ValidateAndHandleRequestArgs {
  onSuccess: () => Promise<void>;
  commandRequestData: CommandRequestData;
}

export const validateAndHandleRequest = async ({
  commandRequestData,
  onSuccess,
}: ValidateAndHandleRequestArgs) => {
  await commandRequestData.services.utility.commandValidationService({
    commandRequestData,
    onSuccess,
    onError: async (err) => {
      commandRequestData.submitMessageHandler(baseTextResponse(err));
    },
  });
};
