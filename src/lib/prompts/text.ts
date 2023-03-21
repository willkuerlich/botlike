import { createCompletion } from 'src/api/oai/createCompletion';
import { CreateCompletionRequest } from 'openai';

export const getBaseTextCompletion = async (
  msg: string,
  options?: CreateCompletionRequest, // TODO: must be first processed through the bot
) => {
  try {
    const storyText = `${msg}`;
    const optionsFallback: CreateCompletionRequest = {
      model: 'text-davinci-003',
      prompt: `${storyText}`,
      max_tokens: 2000,
      // temperature: 0.0,
      // frequency_penalty: 0,
      n: 1,
      // best_of: 2, // serverside generated solutions => CAREFUL WITH QUOTA
      // top_p: 1,
      top_p: 0.1,
      frequency_penalty: 0.7,
      presence_penalty: 0.35,
      // temperature: 0.99,
      // frequency_penalty: 0.5,
    };
    // const optionsFallback2: CreateCompletionRequest = {
    //   model: 'text-davinci-003',
    //   prompt: `${storyText}`,
    //   max_tokens: 1000,
    //   temperature: 90,
    //   // frequency_penalty: 0,
    //   n: 1,
    //   // best_of: 2, // serverside generated solutions => CAREFUL WITH QUOTA
    //   // top_p: 1,
    //   top_p: 1,
    //   frequency_penalty: 0.7,
    //   presence_penalty: 0.35,
    //   // temperature: 0.99,
    //   // frequency_penalty: 0.5,
    // };
    const res = await createCompletion(optionsFallback);
    // X-TODO: replace with bot config text
    return `\n💡 Botlike's Antwort lautet: (ohne Gewähr) 💡\n ${res}`;
  } catch (e) {
    console.log('Error: ', e);
    return 'Error';
  }
};
