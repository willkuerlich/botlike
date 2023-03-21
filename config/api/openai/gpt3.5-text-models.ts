/** GPT3 model type registration - Register newly created models here
 *  - https://beta.openai.com/docs/models/gpt-3
 **/
export const gpt3TextModelTypes = [
  'text-davinci-003', // Complex intent, cause and effect, summarization for audience
  'text-curie-001', // Language translation, complex classification, text sentiment, summarization
  'text-babbage-001', // Moderate classification, semantic search classification
  'text-ada-001', // Parsing text, simple classification, address correction, keywords
] as const;

export const defaultTextCompletionModel: Gpt3TextModelType = 'text-davinci-003';
export const defaultTextCompletionModelMaxTokens: number = 2000; // davinci = 4k | rest = 2048

export type Gpt3TextModelType = (typeof gpt3TextModelTypes)[number];
