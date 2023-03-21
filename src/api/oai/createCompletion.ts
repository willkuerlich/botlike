import {
  defaultTextCompletionModel,
  defaultTextCompletionModelMaxTokens,
} from 'config/api/openai/gpt3.5-text-models';
import { CreateCompletionRequest } from 'openai';

import {
  isCompletionRequestData,
  isKnownOpenAiError,
} from 'src/lib/openai/openai.helper';
import openai from 'src/lib/openai/openai.lib';

const baseCompletionConfig: CreateCompletionRequest = {
  model: defaultTextCompletionModel,
  max_tokens: defaultTextCompletionModelMaxTokens,
  temperature: 0, // basevalue => 1?
  // frequency_penalty: 0,
  n: 1,
  // best_of: 2, // serverside generated solutions => CAREFUL WITH QUOTA
  // top_p: 1,
  // top_p: 0.01,
  frequency_penalty: 0.5,
  presence_penalty: 1.2,
  // stream: false,
  // logprobs: null,
  echo: true,
  user: 'fooUser',
};

export const createCompletion = async (data: string | CreateCompletionRequest) => {
  try {
    const params = isCompletionRequestData(data)
      ? data
      : { ...baseCompletionConfig, prompt: data };
    const completion = await openai.createCompletion(params);

    if (!completion.data.choices[0]?.text) {
      return 'No results for you :*(';
    }
    console.log('completion data: ', completion.data);

    // X-FEAT: provide option to get all choices? => test
    return completion.data.choices[0].text;
  } catch (e: unknown) {
    if (!isKnownOpenAiError(e)) {
      return 'Error';
    }
    console.log('Error: ', e.message);
    console.log('Error: ', e.response);
    return e.message;
    // Consider adjusting the error handling logic for your use case
    // if (error.response) {
    //   console.error(error.response.status, error.response.data);
    //   res.status(error.response.status).json(error.response.data);
    // } else {
    //   console.error(`Error with OpenAI API request: ${error.message}`);
    //   res.status(500).json({
    //     error: {
    //       message: 'An error occurred during your request.',
    //     }
    //   });
    // }
  }
};
