import { createCodexCompletion } from 'src/api/oai/createCodexCompletion';
import { CreateCompletionRequest } from 'openai';
import {
  // defaultCodexModel,
  defaultCodexModelMaxTokens,
} from 'config/api/openai/codex-models';

export const getBaseCodexCompletion = async (
  msg: string,
  options?: CreateCompletionRequest, // TODO: must be first processed through the bot
) => {
  try {
    const storyText = `${msg}`;
    const optionsFallback: CreateCompletionRequest = {
      // model: defaultCodexModel,
      model: 'code-davinci-002',
      prompt: `${storyText}`,
      max_tokens: defaultCodexModelMaxTokens,
      temperature: 0.0,
      // frequency_penalty: 0,
      n: 1,
      // best_of: 2, // serverside generated solutions => CAREFUL WITH QUOTA
      // top_p: 1,
      // top_p: 0.0025,
      frequency_penalty: 1.5,
      presence_penalty: 1.7,
      echo: true, // debug
    };
    const res = await createCodexCompletion(optionsFallback);
    return `\n💡💡💡 Botlike's Codex Antwort lautet: (ohne Gewähr) 💡💡💡\n ${res}`;
  } catch (e) {
    console.log('Error: ', e);
    return 'Error';
  }
};
