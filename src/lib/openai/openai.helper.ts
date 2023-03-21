import type { CreateCompletionRequest } from 'openai';
import type { OpenAiError } from 'src/types/openai.types';

export function isKnownOpenAiError(err: unknown): err is OpenAiError {
  return (
    (err as OpenAiError).message !== undefined &&
    (err as OpenAiError).response !== undefined
  );
}
export const isCompletionRequestData = (
  val: string | CreateCompletionRequest,
): val is CreateCompletionRequest => {
  return typeof val !== 'string' && val.model !== 'undefined';
};
