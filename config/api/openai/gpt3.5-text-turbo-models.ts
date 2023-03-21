/** GPT3 model type registration - Register newly created models here
 *  - https://beta.openai.com/docs/models/gpt-3
 **/

// https://openai.com/blog/introducing-chatgpt-and-whisper-apis
export const gpt3TextTurboModelTypes = ['gpt-3.5-turbo', 'gpt-3.5-turbo-0301'] as const;

export const defaultTextTurboCompletionModel: Gpt3TextTurboModelType = 'gpt-3.5-turbo';
export const defaultTextTurboCompletionModelMaxTokens: number = 2000; // davinci = 4k | rest = 2048

export type Gpt3TextTurboModelType = (typeof gpt3TextTurboModelTypes)[number];
